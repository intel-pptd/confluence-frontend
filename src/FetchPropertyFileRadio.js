import React, { useEffect } from "react";

function FetchPropertyFileRadio({ fetchPropertyFile, setFetchPropertyFile, selectedGitOrg, labelStyle }) {
  
  // Auto-set fetchPropertyFile based on selectedGitOrg
  useEffect(() => {
    if (selectedGitOrg && selectedGitOrg.toLowerCase() !== 'sc-esb') {
      // Force "no" for all orgs except SC-ESB
      setFetchPropertyFile('no');
    }
  }, [selectedGitOrg, setFetchPropertyFile]);

  // Check if current org is SC-ESB (case insensitive)
  const isScEsb = selectedGitOrg && selectedGitOrg.toLowerCase() === 'sc-esb';

  const radioStyle = {
    marginRight: "8px",
    transform: "scale(1.1)",
  };

  const containerStyle = {
    display: "flex",
    gap: "15px",
    marginTop: "8px",
    flexWrap: "wrap",
  };

  const radioOptionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: isScEsb ? "pointer" : "not-allowed",
    opacity: isScEsb ? 1 : 0.5,
    padding: "4px 8px",
    borderRadius: "4px",
    transition: "all 0.3s ease",
  };

  return (
    <div>
      <label style={labelStyle}>
        Fetch Property File: <span style={{ color: "#E74C3C" }}>*</span>
        {!isScEsb && (
          <span style={{ 
            fontSize: "12px", 
            color: "#7F8C8D", 
            fontStyle: "italic",
            marginLeft: "8px"
          }}>
            (Only available for SC-ESB)
          </span>
        )}
      </label>
      
      <div style={containerStyle}>
        <label style={radioOptionStyle}>
          <input
            type="radio"
            name="fetchPropertyFile"
            value="yes"
            checked={fetchPropertyFile === "yes"}
            onChange={(e) => isScEsb && setFetchPropertyFile(e.target.value)}
            style={radioStyle}
            disabled={!isScEsb}
          />
          <span style={{ 
            fontSize: "14px", 
            fontWeight: "500",
            color: isScEsb ? "#2D3748" : "#A0AEC0"
          }}>
            Yes
          </span>
        </label>
        
        <label style={radioOptionStyle}>
          <input
            type="radio"
            name="fetchPropertyFile"
            value="no"
            checked={fetchPropertyFile === "no"}
            onChange={(e) => isScEsb && setFetchPropertyFile(e.target.value)}
            style={radioStyle}
            disabled={!isScEsb}
          />
          <span style={{ 
            fontSize: "14px", 
            fontWeight: "500",
            color: "#2D3748"
          }}>
            No
          </span>
        </label>
      </div>
      
      {!isScEsb && selectedGitOrg && (
        <div style={{
          fontSize: "11px",
          color: "#E53E3E",
          marginTop: "6px",
          fontStyle: "italic",
          background: "#FED7D7",
          padding: "4px 8px",
          borderRadius: "4px",
          border: "1px solid #FEB2B2"
        }}>
          ⚠️ Property file fetching is disabled for {selectedGitOrg}. Only SC-ESB supports this feature.
        </div>
      )}
    </div>
  );
}

export default FetchPropertyFileRadio;
