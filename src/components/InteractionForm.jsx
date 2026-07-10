import { useState } from "react";
import API from "../services/api";

function InteractionForm({ setAiResponse }) {
  const [formData, setFormData] = useState({
    hcpName: "",
    interactionType: "Meeting",
    date: "",
    time: "",
    attendees: "",
    topics: "",
    materials: "",
    samples: "",
    sentiment: "",
    outcome: "",
    followUp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const response = await API.post("/log", formData);

    console.log(response.data);

    // Show AI response inside ChatBox
    setAiResponse(response.data.summary);

    alert("Interaction Logged Successfully!");

  } catch (error) {
  console.log(error);

  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
  }

  alert("Error while logging interaction.");
}
  };

  return (
    <div className="card shadow-sm p-4">
      <h3 className="mb-4">Log HCP Interaction</h3>

      <div className="row">
        {/* HCP Name */}
        <div className="col-md-6 mb-3">
          <label className="form-label">HCP Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search or select HCP"
            name="hcpName"
            value={formData.hcpName}
            onChange={handleChange}
          />
        </div>

        {/* Interaction Type */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Interaction Type</label>
          <select
            className="form-select"
            name="interactionType"
            value={formData.interactionType}
            onChange={handleChange}
          >
            <option>Meeting</option>
            <option>Phone Call</option>
            <option>Video Call</option>
            <option>Email</option>
          </select>
        </div>

        {/* Date */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        {/* Time */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Time</label>
          <input
            type="time"
            className="form-control"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>

        {/* Attendees */}
        <div className="col-12 mb-3">
          <label className="form-label">Attendees</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter attendees"
            name="attendees"
            value={formData.attendees}
            onChange={handleChange}
          />
        </div>

        {/* Topics */}
        <div className="col-12 mb-3">
          <label className="form-label">Topics Discussed</label>
          <textarea
            rows="3"
            className="form-control"
            placeholder="Enter discussion points..."
            name="topics"
            value={formData.topics}
            onChange={handleChange}
          />
        </div>

        {/* Materials */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Materials Shared</label>
          <input
            className="form-control"
            placeholder="Brochure, PDF..."
            name="materials"
            value={formData.materials}
            onChange={handleChange}
          />
        </div>

        {/* Samples */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Samples Distributed</label>
          <input
            className="form-control"
            placeholder="Sample details"
            name="samples"
            value={formData.samples}
            onChange={handleChange}
          />
        </div>

        {/* Sentiment */}
        <div className="col-12 mb-3">
          <label className="form-label d-block">HCP Sentiment</label>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="sentiment"
              value="Positive"
              checked={formData.sentiment === "Positive"}
              onChange={handleChange}
            />
            <label className="form-check-label">Positive</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="sentiment"
              value="Neutral"
              checked={formData.sentiment === "Neutral"}
              onChange={handleChange}
            />
            <label className="form-check-label">Neutral</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="sentiment"
              value="Negative"
              checked={formData.sentiment === "Negative"}
              onChange={handleChange}
            />
            <label className="form-check-label">Negative</label>
          </div>
        </div>

        {/* Outcome */}
        <div className="col-12 mb-3">
          <label className="form-label">Outcomes</label>
          <textarea
            rows="2"
            className="form-control"
            placeholder="Key outcomes..."
            name="outcome"
            value={formData.outcome}
            onChange={handleChange}
          />
        </div>

        {/* Follow-up */}
        <div className="col-12 mb-4">
          <label className="form-label">Follow-up Actions</label>
          <textarea
            rows="2"
            className="form-control"
            placeholder="Next steps..."
            name="followUp"
            value={formData.followUp}
            onChange={handleChange}
          />
        </div>

        {/* Button */}
        <div className="col-12 text-end">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Log Interaction
          </button>
        </div>
      </div>
    </div>
  );
}

export default InteractionForm;