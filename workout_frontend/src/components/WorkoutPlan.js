import React, { useEffect, useState } from "react";
import { fetchWorkoutPlan } from "../api";

// PUBLIC_INTERFACE
function WorkoutPlan() {
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchWorkoutPlan()
      .then(setPlan)
      .catch(() => setError("Could not load workout plan"));
  }, []);

  if (error) return <div className="center"><div className="err">{error}</div></div>;
  if (!plan) return <div className="center"><span>Loading...</span></div>;
  // Example data structure below:
  // plan = [{ day: "Monday", exercises: [{name: "...", sets: 3, reps: 8}, ...]}, ...]
  return (
    <div className="plan-container">
      <h2>Weekly Workout Plan</h2>
      <div className="plan-table-scroll">
        <table className="plan-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Exercises</th>
            </tr>
          </thead>
          <tbody>
            {plan.map((d, i) => (
              <tr key={i}>
                <td>{d.day}</td>
                <td>
                  <ul>
                    {d.exercises.map((ex, j) => (
                      <li key={j}>
                        <strong>{ex.name}</strong>{' '}({ex.sets}x{ex.reps})
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default WorkoutPlan;
