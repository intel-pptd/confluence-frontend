import React from "react";

const FETCH_PROPERTY_OPTIONS = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" }
];

function FetchPropertyFileRadio({ fetchPropertyFile, setFetchPropertyFile, selectedGitOrg, labelStyle }) {
  // Check if fetch property file should be disabled based on selected ESB org
  const isPropertyFileDisabled = selectedGitOrg === "CE-ESB" || selectedGitOrg === "CFIN-ESB";
  
  // Auto-set to "No" if disabled org is selected
  React.useEffect(() => {
    if (isPropertyFileDisabled && fetchPropertyFile !== "No") {
      setFetchPropertyFile("No");
    }
  }, [selectedGitOrg, isPropertyFileDisabled, fetchPropertyFile, setFetchPropertyFile]);

  return (
    <div style={{ marginBottom: "15px" }}>
      <label style={labelStyle}>
        Fetch Property File Details: <span style={{ color: "red" }}>*</span>
        {isPropertyFileDisabled && (
          <span style={{ color: "#666", fontSize: "12px", fontWeight: "normal" }}>
            {" "}(Disabled for {selectedGitOrg})
          </span>
        )}
      </label>
      <div style={{ marginTop: "4px" }}>
        {FETCH_PROPERTY_OPTIONS.map((option) => (
          <label key={option.value} style={{ marginLeft: "10px" }}>
            <input
              type="radio"
              name="fetchPropertyFile"
              value={option.value}
              checked={fetchPropertyFile === option.value}
              onChange={() => !isPropertyFileDisabled && setFetchPropertyFile(option.value)}
              disabled={isPropertyFileDisabled}
              required
              style={{
                cursor: isPropertyFileDisabled ? "not-allowed" : "pointer"
              }}
            />
            <span style={{ 
              color: isPropertyFileDisabled ? "#999" : "inherit",
              cursor: isPropertyFileDisabled ? "not-allowed" : "pointer"
            }}>
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default FetchPropertyFileRadio;
