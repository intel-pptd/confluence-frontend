import React, { useState } from "react";

function FileInput({ onFileChange, accept = "*", multiple = false, label = "Choose file", style, id }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  // Generate unique ID if not provided
  const inputId = id || `fileInput_${Math.random().toString(36).substr(2, 9)}`;

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    if (newFiles.length > 0) {
      if (multiple) {
        // For multiple files, append to existing list
        const updatedFiles = [...selectedFiles, ...newFiles];
        setSelectedFiles(updatedFiles);
        if (onFileChange) {
          onFileChange(updatedFiles);
        }
      } else {
        // For single file, replace the existing file
        setSelectedFiles([newFiles[0]]);
        if (onFileChange) {
          onFileChange(newFiles[0]);
        }
      }
    }
    
    // Clear the file input value so the same file can be selected again
    event.target.value = "";
  };

  const handleRemoveFile = (event, indexToRemove) => {
    event.stopPropagation(); // Prevent event bubbling
    
    if (multiple) {
      const updatedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
      setSelectedFiles(updatedFiles);
      if (onFileChange) {
        onFileChange(updatedFiles);
      }
    } else {
      setSelectedFiles([]);
      // Clear the file input using the unique ID
      const fileInput = document.getElementById(inputId);
      if (fileInput) {
        fileInput.value = "";
      }
      if (onFileChange) {
        onFileChange(null);
      }
    }
  };

  const handleRemoveAllFiles = (event) => {
    event.stopPropagation(); // Prevent event bubbling
    setSelectedFiles([]);
    // Clear the file input using the unique ID
    const fileInput = document.getElementById(inputId);
    if (fileInput) {
      fileInput.value = "";
    }
    if (onFileChange) {
      onFileChange(multiple ? [] : null);
    }
  };

  return (
    <div style={style}>
      {/* Hidden file input with unique ID */}
      <input
        type="file"
        id={inputId}
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        style={{
          display: "none",
        }}
      />
      
      {/* Custom file input button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "6px 12px",
          backgroundColor: "#fff",
          minHeight: "40px",
        }}
      >
        <button
          type="button"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            borderRadius: "4px",
            marginRight: "10px",
            cursor: "pointer",
            fontSize: "14px",
          }}
          onClick={() => document.getElementById(inputId).click()}
        >
          {label}
        </button>
        
        <span style={{ flex: 1, color: selectedFiles.length > 0 ? "#333" : "#999" }}>
          {selectedFiles.length > 0 
            ? multiple 
              ? `${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''} selected`
              : selectedFiles[0].name
            : "No file chosen"
          }
        </span>
        
        {selectedFiles.length > 0 && (
          <button
            type="button"
            onClick={handleRemoveAllFiles}
            style={{
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              padding: "4px 8px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
              marginLeft: "10px",
            }}
          >
            Remove All
          </button>
        )}
      </div>
      
      {/* File list display for multiple files */}
      {multiple && selectedFiles.length > 0 && (
        <div style={{ marginTop: "8px", maxHeight: "200px", overflowY: "auto" }}>
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 12px",
                backgroundColor: "#f8f9fa",
                border: "1px solid #e9ecef",
                borderRadius: "4px",
                marginBottom: "4px",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "bold", fontSize: "14px" }}>{file.name}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  {(file.size / 1024).toFixed(1)} KB • {file.type || "Unknown type"}
                </div>
              </div>
              <button
                type="button"
                onClick={(event) => handleRemoveFile(event, index)}
                style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px",
                  marginLeft: "10px",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* File info display for single file */}
      {!multiple && selectedFiles.length > 0 && (
        <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>
          <div>Size: {(selectedFiles[0].size / 1024).toFixed(1)} KB</div>
          <div>Type: {selectedFiles[0].type || "Unknown"}</div>
          <div>Last modified: {new Date(selectedFiles[0].lastModified).toLocaleDateString()}</div>
        </div>
      )}
    </div>
  );
}

export default FileInput;
