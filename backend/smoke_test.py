"""Quick smoke test for the portfolio API. Run: python smoke_test.py"""

from app import app

client = app.test_client()

print("health:", client.get("/api/health").get_json())

valid = client.post(
    "/api/contact",
    json={
        "name": "Test User",
        "email": "test@example.com",
        "subject": "Hello",
        "message": "This is a test message from the smoke test.",
    },
)
print("contact (valid):", valid.status_code, valid.get_json())

invalid = client.post("/api/contact", json={"name": "T", "email": "bad", "message": "x"})
print("contact (invalid):", invalid.status_code, invalid.get_json())

repos = client.get("/api/github/repos")
payload = repos.get_json()
print("repos:", repos.status_code, len(payload) if isinstance(payload, list) else payload)
