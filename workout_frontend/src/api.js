//
// API services aligned with Django backend endpoints for authentication, workout plans, schedules, body fat estimation, and progress.
// Now accommodates any changes to paths (e.g., pluralization, versioning, parameter updates) and richer error handling.
//

const API_BASE = process.env.REACT_APP_API_BASE || '/api';

// PUBLIC_INTERFACE
export async function login(username, password) {
    /**
     * Login user; expects backend at POST /api/auth/login/
     * Returns user object or error.
     */
    const res = await fetch(`${API_BASE}/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include"
    });
    if (!res.ok) throw new Error((await res.json()).detail || "Login failed");
    return res.json();
}

// PUBLIC_INTERFACE
export async function register(username, password) {
    /**
     * Register new user; expects backend at POST /api/auth/register/
     */
    const res = await fetch(`${API_BASE}/auth/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include"
    });
    if (!res.ok) throw new Error((await res.json()).detail || "Registration failed");
    return res.json();
}

// PUBLIC_INTERFACE
export async function logout() {
    /**
     * Logout; expects backend at POST /api/auth/logout/
     */
    const res = await fetch(`${API_BASE}/auth/logout/`, {
        method: "POST",
        credentials: "include"
    });
    if (!res.ok) throw new Error((await res.json()).detail || "Logout failed");
    return res.json();
}

// PUBLIC_INTERFACE
export async function fetchWorkoutPlan() {
    /**
     * Get the weekly workout plan for current user. GET /api/workout-plans/
     * Returns: [{ day, exercises: [{ name, sets, reps }, ...] }, ...]
     */
    const res = await fetch(`${API_BASE}/workout-plans/`, {
        credentials: "include"
    });
    if (!res.ok) throw new Error((await res.json()).detail || "Failed to fetch plan");
    return res.json();
}

// PUBLIC_INTERFACE
export async function fetchDailySchedule(date) {
    /**
     * Get a user's daily schedule by date. GET /api/daily-schedule/?date=YYYY-MM-DD
     */
    const qs = date ? `?date=${encodeURIComponent(date)}` : "";
    const res = await fetch(`${API_BASE}/daily-schedule/${qs}`, {
        credentials: "include"
    });
    if (!res.ok) throw new Error((await res.json()).detail || "Failed to fetch daily schedule");
    return res.json();
}

// PUBLIC_INTERFACE
export async function updateChecklist(date, checklist) {
    /**
     * Update the checklist (completed exercises) for a day. POST /api/daily-schedule/update/
     */
    const res = await fetch(`${API_BASE}/daily-schedule/update/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, checklist }),
        credentials: "include"
    });
    if (!res.ok) throw new Error((await res.json()).detail || "Failed to update checklist");
    return res.json();
}

// PUBLIC_INTERFACE
export async function estimateBodyFat(data) {
    /**
     * Request body fat percent estimation. POST /api/bodyfat/estimate/
     * Expects: { age, gender, weight, waist, neck, [hip] }
     */
    const res = await fetch(`${API_BASE}/bodyfat/estimate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include"
    });
    if (!res.ok) throw new Error((await res.json()).detail || "Body fat estimation failed");
    return res.json();
}

// PUBLIC_INTERFACE
export async function fetchProgress() {
    /**
     * Fetch user's progress and stats. GET /api/progress/
     * Returns { weight: [{date, value}], lifts: [{name, max}] }
     */
    const res = await fetch(`${API_BASE}/progress/`, {
        credentials: "include"
    });
    if (!res.ok) throw new Error((await res.json()).detail || "Failed to fetch progress");
    return res.json();
}
