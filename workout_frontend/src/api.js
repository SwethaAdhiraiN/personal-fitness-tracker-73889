//
// Basic API services for authentication and data (plans, workouts, progress, body fat estimation).
// Assumes Django backend with endpoints such as /api/login, /api/register, /api/workout-plan, etc.
// Error handling is simple, improve for production.
//

const API_BASE = process.env.REACT_APP_API_BASE || '/api';

export async function login(username, password) {
    const res = await fetch(`${API_BASE}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include"
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
}

export async function register(username, password) {
    const res = await fetch(`${API_BASE}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include"
    });
    if (!res.ok) throw new Error("Registration failed");
    return res.json();
}

export async function fetchWorkoutPlan() {
    const res = await fetch(`${API_BASE}/workout-plan/`, {
        credentials: "include"
    });
    if (!res.ok) throw new Error("Failed to fetch plan");
    return res.json();
}

export async function fetchDailySchedule(date) {
    const qs = date ? `?date=${encodeURIComponent(date)}` : "";
    const res = await fetch(`${API_BASE}/daily-schedule/${qs}`, {
        credentials: "include"
    });
    if (!res.ok) throw new Error("Failed to fetch daily schedule");
    return res.json();
}

export async function updateChecklist(date, checklist) {
    const res = await fetch(`${API_BASE}/daily-schedule/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, checklist }),
        credentials: "include"
    });
    if (!res.ok) throw new Error("Failed to update checklist");
    return res.json();
}

export async function estimateBodyFat(data) {
    const res = await fetch(`${API_BASE}/body-fat-estimate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include"
    });
    if (!res.ok) throw new Error("Body fat estimation failed");
    return res.json();
}

export async function fetchProgress() {
    const res = await fetch(`${API_BASE}/progress/`, {
        credentials: "include"
    });
    if (!res.ok) throw new Error("Failed to fetch progress");
    return res.json();
}

export async function logout() {
    const res = await fetch(`${API_BASE}/logout/`, { method: "POST", credentials: "include" });
    if (!res.ok) throw new Error("Logout failed");
    return res.json();
}
