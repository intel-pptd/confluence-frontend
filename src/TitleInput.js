import React from "react";

function TitleInput({ value, onChange, style }) {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        style={style}
        required
      />
    </div>
  );
}

export default TitleInput;