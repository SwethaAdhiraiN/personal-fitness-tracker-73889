import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import WorkoutPlan from "./components/WorkoutPlan";
import DailySchedule from "./components/DailySchedule";
import BodyFatEstimator from "./components/BodyFatEstimator";
import ProgressCharts from "./components/ProgressCharts";
import { logout } from "./api";

function App() {
  const [theme, setTheme] = useState("light");
  // Holds null (not checked), false (not logged-in), or user object
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // On mount: check session (simplified - in practice use a token or backend endpoint)
  useEffect(() => {
    const userObj = localStorage.getItem("pf_user");
    setUser(userObj ? JSON.parse(userObj) : false);
  }, []);

  const setUserSession = (userObj) => {
    if (userObj) {
      setUser(userObj);
      localStorage.setItem("pf_user", JSON.stringify(userObj));
    } else {
      setUser(false);
      localStorage.removeItem("pf_user");
    }
  };

  const handleLogout = async () => {
    await logout().catch(()=>{});
    setUserSession(null);
  };

  // While user state is null, show splash/loading
  if (user === null) return <div className="App"><div className="center"><h2>Loading...</h2></div></div>;

  return (
    <Router>
      <div className="App">
        <header className="App-header" style={{ padding: 0, minHeight: 0, display: "block" }}>
          <button
            className="theme-toggle"
            onClick={() => setTheme(t => t === "light" ? "dark" : "light")}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          {user ? (
            <div className="dashboard-root">
              <Sidebar onLogout={handleLogout} />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Dashboard user={user} />} />
                  <Route path="/plan" element={<WorkoutPlan />} />
                  <Route path="/schedule" element={<DailySchedule />} />
                  <Route path="/bodyfat" element={<BodyFatEstimator user={user} />} />
                  <Route path="/progress" element={<ProgressCharts />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
            </div>
          ) : (
            <Routes>
              <Route path="/login" element={<Login setUser={setUserSession} />} />
              <Route path="/register" element={<Register setUser={setUserSession} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </header>
      </div>
    </Router>
  );
}

export default App;
