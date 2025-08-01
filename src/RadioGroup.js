import React from "react";

const RADIO_OPTIONS = [
  { label: "MuleSoft", value: "MuleSoft" },
  { label: "Apigee", value: "Apigee" }
];

function RadioGroup({ apiType, setApiType }) {
  return (
    <div>
      {/* API Type Selection */}
      <div style={{ marginBottom: "15px" }}>
        {RADIO_OPTIONS.map((option) => (
          <label key={option.value} style={{ marginLeft: "10px" }}>
            <input
              type="radio"
              name="apiType"
              value={option.value}
              checked={apiType === option.value}
              onChange={() => setApiType(option.value)}
              required
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export default RadioGroup;