import React, { useState } from "react";
import { estimateBodyFat } from "../api";

// PUBLIC_INTERFACE
function BodyFatEstimator({ user }) {
  const [form, setForm] = useState({ age: '', gender: '', weight: '', waist: '', neck: '', hip: '' });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setErr(""); setResult("");
    try {
      const res = await estimateBodyFat(form);
      setResult(res.body_fat_percentage ? `Estimated Body Fat: ${res.body_fat_percentage}%` :
        (res.result || "Estimation complete."));
    } catch (err) {
      setErr(err.message || "Body Fat Estimate failed. Try again.");
    }
    setLoading(false);
  }

  return (
    <div className="center-estimate">
      <h2>Body Fat Percentage Estimator</h2>
      <form className="bodyfat-form" onSubmit={handleSubmit}>
        <label>
          Age: <input type="number" name="age" value={form.age} onChange={handleChange} required />
        </label>
        <label>
          Gender:
          <select name="gender" value={form.gender} onChange={handleChange} required>
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Weight (kg): <input type="number" name="weight" value={form.weight} onChange={handleChange} required />
        </label>
        <label>
          Waist (cm): <input type="number" name="waist" value={form.waist} onChange={handleChange} required />
        </label>
        <label>
          Neck (cm): <input type="number" name="neck" value={form.neck} onChange={handleChange} required />
        </label>
        {form.gender === "female" && (
          <label>
            Hip (cm): <input type="number" name="hip" value={form.hip} onChange={handleChange} required min="0" />
          </label>
        )}
        <button className="btn" type="submit" disabled={loading}>{loading ? "Estimating..." : "Estimate"}</button>
        {err && <div className="err" style={{marginTop: '7px'}}>{err}</div>}
        {result && <div className="estimate-result">{result}</div>}
      </form>
    </div>
  );
}
export default BodyFatEstimator;
