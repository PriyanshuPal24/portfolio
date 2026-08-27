"""Flask API backing the portfolio site: GitHub repo proxy + contact form."""

from __future__ import annotations

import os
import re
import smtplib
import sqlite3
import time
from email.message import EmailMessage
from pathlib import Path
from threading import Lock

import requests
from dotenv import load_dotenv
from flask import Flask, g, jsonify, request
from flask_cors import CORS

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "messages.db"

GITHUB_USERNAME = os.getenv("GITHUB_USERNAME", "PriyanshuPal24")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")  # optional, raises the API rate limit
CACHE_TTL_SECONDS = int(os.getenv("GITHUB_CACHE_TTL", "900"))

ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
    if origin.strip()
]

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$")

MAX_LENGTHS = {"name": 80, "email": 120, "subject": 120, "message": 2000}

RATE_LIMIT_WINDOW_SECONDS = 3600
RATE_LIMIT_MAX_REQUESTS = 5

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ALLOWED_ORIGINS}})

_github_cache: dict[str, object] = {"fetched_at": 0.0, "data": None}
_cache_lock = Lock()
_rate_limits: dict[str, list[float]] = {}
_rate_lock = Lock()


# --------------------------------------------------------------------------- db
def get_db() -> sqlite3.Connection:
    if "db" not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.row_factory = sqlite3.Row
    return g.db


@app.teardown_appcontext
def close_db(_exception: BaseException | None) -> None:
    db = g.pop("db", None)
    if db is not None:
        db.close()


def init_db() -> None:
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                subject TEXT,
                message TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT (datetime('now'))
            )
            """
        )


# ---------------------------------------------------------------------- helpers
def client_ip() -> str:
    return request.remote_addr or "unknown"


def rate_limited(key: str) -> bool:
    now = time.monotonic()
    with _rate_lock:
        hits = [t for t in _rate_limits.get(key, []) if now - t < RATE_LIMIT_WINDOW_SECONDS]
        if len(hits) >= RATE_LIMIT_MAX_REQUESTS:
            _rate_limits[key] = hits
            return True
        hits.append(now)
        _rate_limits[key] = hits
        return False


def validate_contact(payload: dict) -> tuple[dict | None, str | None]:
    if not isinstance(payload, dict):
        return None, "Invalid request body."

    cleaned = {}
    for field in ("name", "email", "subject", "message"):
        value = payload.get(field, "")
        if not isinstance(value, str):
            return None, f"Field '{field}' must be text."
        value = value.strip()
        if len(value) > MAX_LENGTHS[field]:
            return None, f"Field '{field}' is too long."
        cleaned[field] = value

    if len(cleaned["name"]) < 2:
        return None, "Please enter your name."
    if not EMAIL_RE.match(cleaned["email"]):
        return None, "Please enter a valid email address."
    if len(cleaned["message"]) < 10:
        return None, "Please write a slightly longer message."

    return cleaned, None


def send_via_resend(data: dict, to_address: str) -> bool:
    """Send through the Resend HTTPS API. Returns False when not configured."""
    api_key = os.getenv("RESEND_API_KEY")
    if not api_key:
        return False

    response = requests.post(
        "https://api.resend.com/emails",
        headers={"Authorization": f"Bearer {api_key}"},
        json={
            "from": os.getenv("RESEND_FROM", "Portfolio <onboarding@resend.dev>"),
            "to": [to_address],
            "reply_to": data["email"],
            "subject": f"Portfolio contact: {data['subject'] or 'New message'}",
            "text": f"Name: {data['name']}\nEmail: {data['email']}\n\n{data['message']}",
        },
        timeout=15,
    )
    response.raise_for_status()
    return True


def send_via_smtp(data: dict, to_address: str) -> bool:
    """Send through SMTP. Returns False when not configured."""
    host = os.getenv("SMTP_HOST")
    user = os.getenv("SMTP_USER")
    # Google displays app passwords in spaced groups of four; SMTP expects them unspaced.
    password = os.getenv("SMTP_PASSWORD", "").replace(" ", "")

    if not host:
        return False
    if user and not password:  # credentials half-filled; skip until the password is set
        return False

    msg = EmailMessage()
    msg["Subject"] = f"Portfolio contact: {data['subject'] or 'New message'}"
    msg["From"] = os.getenv("SMTP_FROM", user or to_address)
    msg["To"] = to_address
    msg["Reply-To"] = data["email"]
    msg.set_content(f"Name: {data['name']}\nEmail: {data['email']}\n\n{data['message']}")

    with smtplib.SMTP(host, int(os.getenv("SMTP_PORT", "587")), timeout=15) as server:
        server.starttls()
        if user and password:
            server.login(user, password)
        server.send_message(msg)
    return True


def send_notification_email(data: dict) -> None:
    """Best-effort notification; the message is always stored in SQLite regardless."""
    to_address = os.getenv("CONTACT_TO_EMAIL")
    if not to_address:
        return

    if send_via_resend(data, to_address):
        return
    send_via_smtp(data, to_address)


def fetch_github_repos() -> list[dict]:
    headers = {"Accept": "application/vnd.github+json"}
    if GITHUB_TOKEN:
        headers["Authorization"] = f"Bearer {GITHUB_TOKEN}"

    response = requests.get(
        f"https://api.github.com/users/{GITHUB_USERNAME}/repos",
        params={"per_page": 100, "sort": "updated"},
        headers=headers,
        timeout=15,
    )
    response.raise_for_status()

    return [
        {
            "name": repo["name"],
            "description": repo["description"],
            "html_url": repo["html_url"],
            "homepage": repo["homepage"],
            "language": repo["language"],
            "stargazers_count": repo["stargazers_count"],
            "forks_count": repo["forks_count"],
            "topics": repo.get("topics", []),
            "pushed_at": repo["pushed_at"],
            "fork": repo["fork"],
        }
        for repo in response.json()
    ]


# ----------------------------------------------------------------------- routes
@app.get("/api/health")
def health():
    return jsonify(status="ok")


@app.get("/api/github/repos")
def github_repos():
    with _cache_lock:
        cached = _github_cache["data"]
        age = time.monotonic() - float(_github_cache["fetched_at"])
        if cached is not None and age < CACHE_TTL_SECONDS:
            return jsonify(cached)

    try:
        repos = fetch_github_repos()
    except requests.RequestException:
        with _cache_lock:
            stale = _github_cache["data"]
        if stale is not None:
            return jsonify(stale)
        return jsonify(error="Unable to reach GitHub right now."), 502

    with _cache_lock:
        _github_cache["data"] = repos
        _github_cache["fetched_at"] = time.monotonic()

    return jsonify(repos)


@app.post("/api/contact")
def contact():
    if rate_limited(client_ip()):
        return jsonify(error="Too many messages sent. Please try again later."), 429

    data, error = validate_contact(request.get_json(silent=True) or {})
    if error:
        return jsonify(error=error), 400

    db = get_db()
    db.execute(
        "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
        (data["name"], data["email"], data["subject"], data["message"]),
    )
    db.commit()

    try:
        send_notification_email(data)
    except Exception:  # noqa: BLE001 - notification must never break the request
        app.logger.exception("Failed to send contact notification email")

    return jsonify(status="ok"), 201


init_db()

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=os.getenv("FLASK_DEBUG") == "1")
