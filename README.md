# EDVEDUM ACADEMY — Full-Stack Online Test Platform

**EDVEDUM ACADEMY** is a JEE / NEET / Foundation ed-tech platform built on a production-grade
assessment engine: timed CBT mocks, test series, payments, admin console, and student portal.

**Stack:** React + Vite + Tailwind CSS · Node.js + Express · PostgreSQL · JWT auth

| Environment | URL |
|-------------|-----|
| **Frontend (Vercel)** | https://test-platform-umber-kappa.vercel.app |
| **Backend API (Render)** | https://test-platform-cr9j.onrender.com/api |
| **Local frontend** | http://localhost:5173 |
| **Local backend** | http://localhost:5000/api |

**Admin login (after seed):** `admin@assess.io` / `Admin@12345`

---

# AssessPro Engine — Full-Stack Interview Assessment Platform

A production-grade, proctored online assessment platform with a candidate portal, an admin
management console, a timed MCQ assessment engine, real-time autosave, and a configurable
anti-cheat system with violation tracking.

**Stack:** React + Vite + Tailwind CSS · Node.js + Express · PostgreSQL · JWT auth

---

## Features

### Authentication & Security
- Candidate self-registration + shared candidate/admin login
- JWT-based stateless auth with role-based authorization
- Passwords hashed with bcrypt
- Input validation with Zod on every write endpoint
- Parameterized queries everywhere (SQL-injection safe)
- `helmet` security headers, CORS lockdown, and rate limiting (global + strict auth limiter)

### Candidate Portal
- Dashboard with assessment stats
- List of available (published) assessments with attempt status
- Assessment instructions screen with rules + consent
- One-click start that enters fullscreen
- Result page (respects per-assessment result visibility)

### Assessment Engine
- MCQ questions with per-question marks
- **Single attempt only** (enforced by a unique DB constraint)
- Per-assessment countdown timer
- **Auto-submit on time end**
- **Real-time answer autosave** (upsert per question)
- **Resume protection** — reloading restores answers and remaining time
- Automatic scoring + percentage + pass/fail

### Anti-Cheat System
- Fullscreen required, with a blocking re-enter overlay
- Detects tab switch / minimize (visibility change)
- Detects window blur
- Detects fullscreen exit
- Disables right-click, copy / cut / paste, and common dev-tools/print shortcuts
- Logs every violation to the database
- Configurable warning limit per assessment
- **Auto-submit after max violations**

### Admin Console
- Overview dashboard: total candidates, assessments, attempts, pass/fail + pass rate
- Assessment CRUD, set duration / passing marks / violation limit, publish & unpublish
- Question add / edit / delete with dynamic options and correct-answer selection
- Candidate roster with attempt counts
- Attempt reports with filtering (passed / failed / in progress)
- Per-attempt deep report: answer breakdown + full violation log

---

## Project Structure

```
interview tracker/
├── backend/                  # Express + PostgreSQL API
│   ├── src/
│   │   ├── config/           # env + db pool
│   │   ├── controllers/      # route handlers (business logic)
│   │   ├── db/               # schema.sql, migrate, seed
│   │   ├── middleware/       # auth, validation, rate limiting, errors
│   │   ├── routes/           # express routers
│   │   ├── utils/            # tokens, hashing, ApiError, asyncHandler
│   │   ├── validators/       # Zod schemas
│   │   ├── app.js            # express app wiring
│   │   └── server.js         # entry point
│   └── package.json
├── frontend/                 # React + Vite + Tailwind SPA
│   ├── src/
│   │   ├── components/       # Layout, ProtectedRoute, UI primitives, Modal
│   │   ├── context/          # Auth + Toast providers
│   │   ├── hooks/            # useProctoring (anti-cheat)
│   │   ├── lib/              # axios client, services, proctoring, formatters
│   │   ├── pages/            # auth, candidate/*, admin/*
│   │   ├── App.jsx           # routes
│   │   └── main.jsx
│   └── package.json
├── docs/
│   └── API.md                # full API reference
├── docker-compose.yml        # one-command full-stack setup
└── README.md
```

---

## Quick Start (Docker) — single command

**Requirements:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose v2).

From the project root:

```bash
copy .env.example .env        # Windows (use `cp .env.example .env` on macOS/Linux)
docker compose up --build -d
```

That one command starts **PostgreSQL**, runs **migrations automatically**, seeds demo data, and launches the **backend** and **frontend**.

| Service    | URL                          |
|------------|------------------------------|
| Frontend   | http://localhost:5173        |
| Backend API| http://localhost:5000/api    |
| PostgreSQL | localhost:5432 (internal)    |

**Useful Docker commands:**

```bash
docker compose logs -f              # follow all service logs
docker compose logs -f backend      # backend only
docker compose down                 # stop containers (keeps DB data)
docker compose down -v              # stop and delete database volume
docker compose up --build -d        # rebuild and restart after code changes
```

Set `RUN_SEED=false` in `.env` after the first run if you do not want the seed script to run on every backend restart.

---

## Prerequisites (manual setup)
- Node.js 18+ (tested on 24)
- PostgreSQL 13+ running locally (or a hosted connection string)

---

## Manual Setup

### 1. Database
Create a database (default name `interview_platform`):

```sql
CREATE DATABASE interview_platform;
```

### 2. Backend

```bash
cd backend
npm install
copy .env.example .env       # Windows (use `cp` on macOS/Linux)
# edit .env: set DATABASE_URL (or PG* vars) and a strong JWT_SECRET
npm run db:migrate           # create tables
npm run db:seed              # create demo admin/candidate + sample assessment
npm run dev                  # API on http://localhost:5000
```

Useful scripts:
- `npm run db:reset` — drop, recreate, and reseed everything

### 3. Frontend

```bash
cd frontend
npm install
copy .env.example .env       # optional; leave VITE_API_URL empty to use the dev proxy
npm run dev                  # app on http://localhost:5173
```

The Vite dev server proxies `/api` to `http://localhost:5000`, so no extra config is needed locally.

---

## Demo Accounts (after `npm run db:seed`)

| Role      | Email                 | Password       |
|-----------|-----------------------|----------------|
| Admin     | admin@assess.io       | Admin@12345    |
| Candidate | candidate@assess.io   | Candidate@123  |

A sample published "JavaScript Fundamentals" assessment is created so you can take a test immediately.

---

## How It Works (key flows)

**Single attempt + resume:** `POST /api/attempts/start` creates exactly one attempt per
`(assessment, candidate)` pair (DB unique constraint). Starting again returns the existing
in-progress attempt (resume) or a `409` if already completed/expired.

**Autosave:** Selecting an option calls `PUT /api/attempts/:id/answer`, which upserts the answer.
Reloading re-fetches saved answers and the remaining time from `ends_at`.

**Auto-submit:** The timer and every server interaction check `ends_at`; expired in-progress
attempts are finalized server-side as `auto_submitted`. Violations beyond `max_violations`
finalize the attempt the same way.

**Scoring:** On submission the server compares saved answers to `correct_index`, sums marks,
computes the percentage, and stores a `scores` row with `passed = marks_obtained >= passing_marks`.

---

## Production (Vercel + Render)

1. **Backend on Render** — set `DATABASE_URL`, `JWT_SECRET`, `CLIENT_URL` (include your Vercel domain), SMTP and Razorpay keys as needed. `render.yaml` runs migrations on deploy.
2. **Frontend on Vercel** — deploy `frontend/`; **do not** set `VITE_API_URL`. `vercel.json` proxies `/api` to Render.
3. **CORS** — `CLIENT_URL` on Render must include `https://test-platform-umber-kappa.vercel.app` (comma-separated if multiple origins).

---

## Production Notes
- Set `NODE_ENV=production`, a long random `JWT_SECRET`, and a real `DATABASE_URL`.
- SSL is auto-enabled for non-localhost `DATABASE_URL` in production.
- Build the frontend with `npm run build` and serve `frontend/dist` from any static host/CDN;
  point `VITE_API_URL` at the deployed API.
- Client-side anti-cheat is a deterrent, not a guarantee — pair it with the server-side violation
  log and human review for high-stakes assessments.

See [`docs/API.md`](docs/API.md) for the full endpoint reference.
