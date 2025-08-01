import React from "react";

function ResponseDisplay({ response }) {
  if (!response) return null;
  return (
    <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", background: "#f9f9f9" }}>
      <h2>Response:</h2>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}

export default ResponseDisplay;