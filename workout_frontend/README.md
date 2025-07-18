# Workout Frontend (React)

This directory contains the React-based web UI for the Personal Fitness Tracker. It connects to the backend API and enables users to interact with personalized workout plans, daily schedules, body fat estimation, and progress visualizations.

## Overview

- **UI Tech:** React (with vanilla CSS for styling & theming)
- **Main Features:**
  - User login/registration
  - Dashboard-driven navigation
  - Personalized weekly workout plan display
  - Daily workout schedule & checklist
  - Body fat percentage estimator
  - Charts for progress tracking
- **Container integration:** Makes HTTP requests to the backend API (Django) and expects API/CORS settings to allow interaction.

## Required Environment Variables

- `.env` file is optional for this frontend, but is supported to configure API URL.
  - If omitted, defaults to `/api` (proxy)
- Supported variable:

| Variable           | Required | Purpose                           | Example                                 |
|--------------------|----------|-----------------------------------|-----------------------------------------|
| `REACT_APP_API_BASE` | No       | Base URL for backend API          | `http://localhost:8000/api`             |

If your frontend is served separately from the backend (e.g., during development):

```env
REACT_APP_API_BASE=http://localhost:8000/api
```

If using a reverse proxy or serving frontend from same host as API, no change needed.

## Bootstrapping & Setup

Run all commands from this directory (`workout_frontend`).

### 1. Install Node Dependencies

```sh
npm install
```

### 2. Start the Frontend in Development Mode

```sh
npm start
```

This will launch the frontend at [http://localhost:3000](http://localhost:3000) by default.

## Known Ports

- React development server: **3000**

## Available Commands

- `npm start` — Start local development server
- `npm run build` — Create production-ready build in `build/`
- `npm test` — Run unit tests

## Connecting to Backend

- By default, API requests are sent to `/api`, which presumes a proxy setup from frontend:3000 → backend:8000/api.
    - If running containers separately, set `REACT_APP_API_BASE` in your `.env` to point to the backend API (`http://localhost:8000/api`).
- **CORS** and session cookies must be allowed on the backend for full integration (already preconfigured in backend's `settings.py`).
- Login and session are stored as browser cookies (backend uses session/cookie auth).

## Cross-Container/Stack Run Instructions

1. **Start the workout_database** and ensure the main database is initialized (`init_db.py`).
2. **Start backend** and set the `SQLITE_DB` variable so it points to the shared SQLite file from the database step.
3. In this directory, use `npm start` to run the frontend.
4. If using `.env`, ensure `REACT_APP_API_BASE` points to backend (`http://localhost:8000/api`).
5. Open `http://localhost:3000` in your browser.

## Testing

- Run `npm test` to execute React/unit tests.

## API Endpoints Used

This frontend expects the backend API as documented in [backend/README.md], including:
- `/api/register/`, `/api/login/`, `/api/logout/`
- `/api/my-weekly-workout/`, `/api/daily-checklist/`
- `/api/estimate-body-fat/`, `/api/progress-chart/`
- RESTful: `/api/workout-plans/`, `/api/daily-workouts/`, and others

See backend for full details.

## Customization & Branding

- Colors and CSS variables are themed in `src/App.css` and documented in the code.
- For code structure, see `src/components/` for main UI modules.

## Troubleshooting

- 404 or CORS issues: make sure backend is running and CORS in backend allows frontend.
- Session/cookie issues: ensure both servers are on localhost and use `CORS_ALLOW_CREDENTIALS` in backend.
- Proxy issues: configure `package.json` and/or `.env` properly.

## Help

For more info or to contribute, review the code in `src/` and contact maintainer.
