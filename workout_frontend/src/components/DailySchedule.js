import React, { useEffect, useState } from "react";
import { fetchDailySchedule, updateChecklist } from "../api";

// PUBLIC_INTERFACE
function DailySchedule() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));
  const [schedule, setSchedule] = useState(null);
  const [checklist, setChecklist] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  function handleChecklistChange(exercise) {
    setChecklist(chk => ({ ...chk, [exercise]: !chk[exercise] }));
  }
  useEffect(() => {
    setLoading(true);
    fetchDailySchedule(date)
      .then(res => {
        setChecklist(res.checklist || {});
        setSchedule(res);
        setMsg("");
        setError("");
      })
      .catch(() => setError("Failed to load schedule"))
      .finally(()=> setLoading(false));
  }, [date]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await updateChecklist(date, checklist);
      setMsg("Checklist saved!");
    } catch {
      setError("Failed to save");
    }
    setLoading(false);
  }

  return (
    <div className="plan-container">
      <h2>Daily Workout Schedule</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select date:
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
        </label>
        {loading && <div>Loading...</div>}
        {error && <div className="err">{error}</div>}
        {schedule && schedule.exercises ? (
        <ul className="checklist-ul">
          {schedule.exercises.map((ex, i) => (
            <li key={i}>
              <input type="checkbox"
                id={"ex-"+i}
                checked={!!checklist[ex.name]}
                onChange={()=>handleChecklistChange(ex.name)}
              />
              <label htmlFor={"ex-"+i}>{ex.name} ({ex.sets}x{ex.reps})</label>
            </li>
          ))}
        </ul>
        ) : (
          <div>No workout scheduled.</div>
        )}
        <button type="submit" className="btn" disabled={loading}>Save Checklist</button>
        {msg && <div style={{color: "#2d6cdf", marginTop: '8px'}}>{msg}</div>}
      </form>
    </div>
  );
}
export default DailySchedule;
