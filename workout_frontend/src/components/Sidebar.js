import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

// PUBLIC_INTERFACE
function Sidebar({ onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">🏋️ Fitness Tracker</div>
      <nav>
        <NavLink to="/" className="sidebar-link">Dashboard</NavLink>
        <NavLink to="/plan" className="sidebar-link">Workout Plan</NavLink>
        <NavLink to="/schedule" className="sidebar-link">Daily Schedule</NavLink>
        <NavLink to="/bodyfat" className="sidebar-link">Body Fat Estimator</NavLink>
        <NavLink to="/progress" className="sidebar-link">Progress Charts</NavLink>
      </nav>
      <button className="sidebar-logout" onClick={onLogout}>Logout</button>
    </aside>
  );
}
export default Sidebar;
