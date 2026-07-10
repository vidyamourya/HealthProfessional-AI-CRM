import { useEffect, useState } from "react";
import API from "../services/api";

function HistoryTable() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await API.get("/history");
      setHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const exportCSV = () => {
    const headers = [
      "HCP Name",
      "Interaction Type",
      "Date",
      "Sentiment",
      "Outcome",
    ];

    const rows = history.map((item) => [
      item.hcpName,
      item.interactionType,
      item.date,
      item.sentiment,
      item.outcome,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "interaction_history.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.hcpName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || item.sentiment === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="card shadow-sm p-4 mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Interaction History</h4>

        <button
          className="btn btn-success"
          onClick={exportCSV}
        >
          Export CSV
        </button>
      </div>

      <div className="row mb-3">

        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search HCP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Sentiments</option>
            <option value="Positive">Positive</option>
            <option value="Neutral">Neutral</option>
            <option value="Negative">Negative</option>
          </select>
        </div>

      </div>

      <table className="table table-striped table-hover">

        <thead className="table-dark">
          <tr>
            <th>HCP Name</th>
            <th>Type</th>
            <th>Date</th>
            <th>Sentiment</th>
            <th>Outcome</th>
          </tr>
        </thead>

        <tbody>
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item, index) => (
              <tr key={index}>
                <td>{item.hcpName}</td>
                <td>{item.interactionType}</td>
                <td>{item.date}</td>
                <td>{item.sentiment}</td>
                <td>{item.outcome}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No interactions found.
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}

export default HistoryTable;