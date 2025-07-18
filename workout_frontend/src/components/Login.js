import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api";

// PUBLIC_INTERFACE
function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const userResp = await login(username, password);
      setUser(userResp);
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    }
    setLoading(false);
  }
  return (
    <div className="center">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="err">{error}</div>}
        <label>
          Username<br/>
          <input value={username} onChange={e=>setUsername(e.target.value)} autoFocus required />
        </label>
        <label>
          Password<br/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        <button className="btn" type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        <div style={{marginTop: '15px'}}>
          No account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
export default Login;
