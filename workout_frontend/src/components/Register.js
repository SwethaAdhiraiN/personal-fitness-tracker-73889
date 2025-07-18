import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api";

// PUBLIC_INTERFACE
function Register({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const userResp = await register(username, password);
      setUser(userResp);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
    setLoading(false);
  }
  return (
    <div className="center">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <div className="err">{error}</div>}
        <label>
          Username<br/>
          <input value={username} onChange={e=>setUsername(e.target.value)} autoFocus required />
        </label>
        <label>
          Password<br/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        <button className="btn" type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
        <div style={{marginTop: '15px'}}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
export default Register;
