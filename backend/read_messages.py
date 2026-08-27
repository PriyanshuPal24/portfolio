"""Print contact form messages stored in the local database.

Usage: python read_messages.py
"""

import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent / "messages.db"

if not DB_PATH.exists():
    raise SystemExit("No messages.db yet — no messages have been submitted.")

with sqlite3.connect(DB_PATH) as conn:
    conn.row_factory = sqlite3.Row
    rows = conn.execute(
        "SELECT id, name, email, subject, message, created_at FROM messages ORDER BY id DESC"
    ).fetchall()

if not rows:
    raise SystemExit("No messages yet.")

print(f"{len(rows)} message(s):\n")
for row in rows:
    print(f"#{row['id']}  {row['created_at']}")
    print(f"From:    {row['name']} <{row['email']}>")
    print(f"Subject: {row['subject'] or '(none)'}")
    print(f"\n{row['message']}\n")
    print("-" * 60)
