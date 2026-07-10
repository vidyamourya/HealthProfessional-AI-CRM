import { useEffect, useState } from "react";
import API from "../services/api";

function DashboardCards() {
  const [stats, setStats] = useState({
    total: 0,
    positive: 0,
    neutral: 0,
    negative: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await API.get("/dashboard");
      console.log(response.data); 

      setStats(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row mb-4">

      <div className="col-md-3">
        <div className="card shadow-sm text-center p-3">
          <h6>Total Interactions</h6>
          <h2>{stats.total}</h2>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow-sm text-center p-3">
          <h6>Positive</h6>
          <h2>{stats.positive}</h2>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow-sm text-center p-3">
          <h6>Neutral</h6>
          <h2>{stats.neutral}</h2>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow-sm text-center p-3">
          <h6>Negative</h6>
          <h2>{stats.negative}</h2>
        </div>
      </div>

    </div>
  );
}

export default DashboardCards;