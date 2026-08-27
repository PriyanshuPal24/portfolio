# Priyanshu Pal — Portfolio

Personal portfolio site built with a **React (Vite)** front end and a **Flask (Python)** API.

## Features

- Responsive single-page site: hero, about, skills, experience, projects, education, contact
- Dark / light theme toggle with system preference detection and persistence
- Projects loaded live from the GitHub API (via a cached Flask proxy, with a direct-to-GitHub fallback)
- Contact form that validates input, rate-limits by IP, stores messages in SQLite and optionally emails you
- Resume PDF download

## Project structure

```
backend/    Flask API (contact form, GitHub proxy)
frontend/   React + Vite site
```

## Getting started

### Backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python app.py
```

The API runs on `http://127.0.0.1:5000`.

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

The site runs on `http://localhost:5173` and proxies `/api` to the Flask server.

## Customising your details

Everything shown on the site lives in [frontend/src/data/profile.js](frontend/src/data/profile.js) —
name, tagline, summary, skills, experience, education, links and which repos are featured.

Before sharing the site:

1. Set your real email in [frontend/src/data/profile.js](frontend/src/data/profile.js).
2. Review the experience and education entries and correct anything that is off.
3. Drop your resume into `frontend/public/resume.pdf`.

## Environment variables

Backend (`backend/.env`, see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `GITHUB_USERNAME` | Account whose repos are shown |
| `GITHUB_TOKEN` | Optional token to raise the GitHub rate limit |
| `ALLOWED_ORIGINS` | Comma-separated origins allowed by CORS |
| `CONTACT_TO_EMAIL` | Where contact form submissions are emailed |
| `RESEND_API_KEY` | Preferred email transport (HTTPS API) |
| `SMTP_*` | Fallback transport, used only if `RESEND_API_KEY` is empty |

Frontend (`frontend/.env`, see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `VITE_API_BASE` | Full API URL in production (e.g. `https://your-api.onrender.com/api`) |

## Reading contact messages

Every submission is stored in `backend/messages.db` regardless of whether email is configured:

```powershell
cd backend
.\.venv\Scripts\python.exe read_messages.py
```

## Deployment

**Backend → Render** (config in [render.yaml](render.yaml))

1. Push this repo to GitHub.
2. In Render, create a new Blueprint from the repo; it reads `render.yaml`.
3. Set `ALLOWED_ORIGINS`, `CONTACT_TO_EMAIL` and `RESEND_API_KEY` in the dashboard.
4. Note the service URL, e.g. `https://portfolio-api.onrender.com`.

**Frontend → Vercel** (config in [frontend/vercel.json](frontend/vercel.json))

1. Import the repo in Vercel and set the root directory to `frontend`.
2. Add environment variable `VITE_API_BASE=https://portfolio-api.onrender.com/api`.
3. Deploy, then set `ALLOWED_ORIGINS` on Render to the Vercel URL and redeploy the API.

Notes:

- Render's free tier sleeps after inactivity, so the first request can take ~30s.
- The free tier also uses ephemeral storage, so `messages.db` resets on redeploy. Configure
  `RESEND_API_KEY` so submissions also arrive by email.

