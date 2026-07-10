function ChatBox({ aiResponse }) {
  return (
    <div className="card shadow-sm p-4">

      <h4 className="mb-3">
        AI Assistant
      </h4>

      <div
        style={{
          height: "500px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "15px",
          background: "#fafafa",
          overflowY: "auto"
        }}
      >
        {aiResponse ? (
          <>
            <h6>AI Analysis</h6>
            <p>{aiResponse}</p>
          </>
        ) : (
          <p className="text-muted">
            AI response will appear here after logging an interaction...
          </p>
        )}
      </div>

    </div>
  );
}

export default ChatBox;