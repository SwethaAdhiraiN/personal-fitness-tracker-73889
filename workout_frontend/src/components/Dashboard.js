import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
function Dashboard({ user }) {
  return (
    <div className="dash-container">
      <h2>Welcome, {user?.username || "User"}!</h2>
      <div className="dash-widgets">
        <DashWidget to="/plan" title="View Workout Plan" emoji="🗓️" desc="See your weekly plan" />
        <DashWidget to="/schedule" title="Today's Workout" emoji="✅" desc="Check your daily schedule" />
        <DashWidget to="/progress" title="Progress Charts" emoji="📈" desc="Track your improvements" />
        <DashWidget to="/bodyfat" title="Body Fat Estimator" emoji="⚖️" desc="Estimate your body fat" />
      </div>
    </div>
  );
}

function DashWidget({ to, title, emoji, desc }) {
  return (
    <Link to={to} className="dash-widget">
      <div className="dw-emoji">{emoji}</div>
      <div>
        <div className="dw-title">{title}</div>
        <div className="dw-desc">{desc}</div>
      </div>
    </Link>
  );
}
export default Dashboard;
