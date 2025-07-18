import React, { useEffect, useState, useRef } from "react";
import { fetchProgress } from "../api";
import Chart from "chart.js/auto";

// PUBLIC_INTERFACE
function ProgressCharts() {
  const [progress, setProgress] = useState(null);
  const [err, setErr] = useState("");
  const weightChartRef = useRef();
  const liftsChartRef = useRef();

  useEffect(() => {
    fetchProgress()
      .then(setProgress)
      .catch(err => setErr(err.message || "Could not load progress data"));
  }, []);

  useEffect(() => {
    if (!progress) return;
    // Weight/time line
    let chart1;
    if (weightChartRef.current) {
      chart1 = new Chart(weightChartRef.current, {
        type: "line",
        data: {
          labels: progress.weight.map(w => w.date),
          datasets: [
            {
              label: "Body Weight (kg)",
              data: progress.weight.map(w => w.value),
              borderColor: "#2d6cdf",
              fill: false
            }
          ]
        },
        options: { plugins: { legend: { display: true } }, responsive: true }
      });
    }
    // Main lifts bar
    let chart2;
    if (liftsChartRef.current) {
      chart2 = new Chart(liftsChartRef.current, {
        type: "bar",
        data: {
          labels: progress.lifts.map(l => l.name),
          datasets: [
            {
              label: "Best Lift (kg)",
              data: progress.lifts.map(l => l.max),
              backgroundColor: "#13b886"
            }
          ]
        },
        options: { plugins: { legend: { display: false } }, responsive: true }
      });
    }
    return () => {
      if (chart1) chart1.destroy();
      if (chart2) chart2.destroy();
    };
  }, [progress]);

  return (
    <div className="plan-container">
      <h2>Progress Visualization</h2>
      {err && <div className="err">{err}</div>}
      {!progress && <div>Loading...</div>}
      {progress && (
        <>
          <h4>Body Weight Over Time</h4>
          <canvas ref={weightChartRef} width="400" height="180" />
          <h4>Best Lifts (kg)</h4>
          <canvas ref={liftsChartRef} width="400" height="180" />
        </>
      )}
    </div>
  );
}
export default ProgressCharts;
