import React from "react";

function ParentPageTitleDropdown({ value, setValue, style }) {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={style} // Apply the same style used by Page Title
      />
    </div>
  );
}

export default ParentPageTitleDropdown;