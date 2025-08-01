import React, { useState } from "react";
import RadioGroup from "./RadioGroup";
import GitOrgDropdown from "./GitOrgDropdown";
import TitleInput from "./TitleInput";
import ParentPageTitleDropdown from "./ParentPageTitleDropdown";
import WikiSpaceKeyDropdown from "./WikiSpaceKeyDropdown";
import FileInput from "./FileInput";
import FetchPropertyFileRadio from "./FetchPropertyFileRadio";
// import ResponseDisplay from "./ResponseDisplay";

function WikiGeneration({
  apiType,
  setApiType,
  fetchPropertyFile,
  setFetchPropertyFile,
  gitOrgs,
  setGitOrgs,
  selectedGitOrg,
  setSelectedGitOrg,
  pageData,
  setPageData,
  wikiSpaceKeys,
  setWikiSpaceKeys,
  handleSubmit,
  response,
  onNavigateHome, // Add navigation prop
}) {
  const containerStyle = {
    maxWidth: "650px",
    margin: "40px auto",
    padding: "30px",
    background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
    borderRadius: "20px",
    boxShadow: "0 15px 35px rgba(52, 152, 219, 0.1), 0 5px 15px rgba(0,0,0,0.08)",
    border: "1px solid rgba(52, 152, 219, 0.1)",
  };

  // Common label style
  const labelStyle = {
    display: "block",
    fontWeight: "600",
    marginBottom: "6px",
    color: "#2C3E50",
    fontSize: "0.95rem",
  };

  // Shared style for text fields
  const fieldStyle = {
    width: "100%",
    height: "42px",
    marginBottom: "12px",
    marginTop: "4px",
    padding: "10px 12px",
    border: "2px solid #BDC3C7",
    borderRadius: "8px",
    fontSize: "0.95rem",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    backgroundColor: "#ffffff",
  };

  // Local state for displaying a status message
  const [statusMessage, setStatusMessage] = useState("");
  const [inProgress, setInProgress] = useState(false);
  const [selectedTddIrdFiles, setSelectedTddIrdFiles] = useState([]);
  const [selectedPostmanFiles, setSelectedPostmanFiles] = useState([]);
  const [selectedCommFiles, setSelectedCommFiles] = useState([]);



  // File change handlers (ensure they're separate)
  const handleTddIrdFileChange = async (files) => {
    console.log("TDD/IRD files selected:", files);
    setSelectedTddIrdFiles(files || []);
  };

  const handlePostmanFileChange = async (files) => {
    console.log("Postman files selected:", files);
    setSelectedPostmanFiles(files || []);
  };

  const handleCommFileChange = async (files) => {
    console.log("Communication files selected:", files);
    setSelectedCommFiles(files || []);
  };

  // Wrap the handleSubmit prop in a local handler
  const onLocalSubmit = async (e) => {
    e.preventDefault();
    setInProgress(true);
    setStatusMessage("Generating Confluence page... Please wait.");
    
    try {
      // Create proper form data structure that matches backend expectations
      const formDataWithFiles = {
        // Form field data (as expected by backend)
        apiType: apiType,
        fetchPropertyFile: fetchPropertyFile,
        selectedGitOrg: selectedGitOrg,
        wikiSpaceKey: pageData.wikiSpaceKey,
        pageToBeCreatedTitle: pageData.pageToBeCreatedTitle,
        pageToBeCreatedParentPageTitle: pageData.pageToBeCreatedParentPageTitle,
        appName: pageData.appName,
        // File arrays
        selectedTddIrdFiles: selectedTddIrdFiles,
        selectedPostmanFiles: selectedPostmanFiles,
        selectedCommFiles: selectedCommFiles,
        hasFiles: (selectedTddIrdFiles && selectedTddIrdFiles.length > 0) || 
                  (selectedPostmanFiles && selectedPostmanFiles.length > 0) || 
                  (selectedCommFiles && selectedCommFiles.length > 0)
      };
      
      // Call handleSubmit and use the result
      await handleSubmit(formDataWithFiles);
      setInProgress(false);
      setStatusMessage("Confluence page generated successfully!");
    } catch (error) {
      setInProgress(false);
      setStatusMessage(`Error generating Confluence page: ${error.message}`);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", position: "relative" }}>
      {/* Left Navigation Panel */}
      <div style={{
        width: "200px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        alignItems: "flex-start",
        position: "fixed",
        left: 0,
        top: "70px", // Account for top nav
        height: "calc(100vh - 70px)",
        zIndex: 10,
      }}>
        <button
          style={{
            color: "#fff",
            background: "linear-gradient(145deg, #E74C3C, #C0392B)",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "0.9rem",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(231, 76, 60, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            width: "100%",
          }}
          onClick={onNavigateHome}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 16px rgba(231, 76, 60, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 12px rgba(231, 76, 60, 0.3)";
          }}
        >
          🏠 Home
        </button>
        <button
          style={{
            color: "#fff",
            background: "linear-gradient(145deg, #27AE60, #229954)",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "0.9rem",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(39, 174, 96, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            width: "100%",
          }}
          onClick={onNavigateHome}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 16px rgba(39, 174, 96, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 12px rgba(39, 174, 96, 0.3)";
          }}
        >
          ← Back
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ ...containerStyle, marginLeft: "220px" }}>
        <h2 style={{ 
          marginBottom: "25px", 
          textAlign: "center",
          color: "#2C3E50",
          fontSize: "2.2rem",
          fontWeight: "700",
          background: "linear-gradient(135deg, #3498DB, #9B59B6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>Intelligent Wiki Generation</h2>
      
      {/* Feature highlights */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "35px",
          padding: "25px",
          background: "linear-gradient(135deg, #3498DB 0%, #9B59B6 50%, #E74C3C 100%)",
          borderRadius: "15px",
          color: "white",
          flexWrap: "wrap",
          gap: "12px",
          boxShadow: "0 10px 30px rgba(52, 152, 219, 0.3)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", flex: 1, minWidth: "120px" }}>
          <span style={{ fontSize: "1.5rem" }}>🚀</span>
          <span style={{ fontSize: "0.9rem", fontWeight: "600", textAlign: "center" }}>Automated Documentation</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", flex: 1, minWidth: "120px" }}>
          <span style={{ fontSize: "1.5rem" }}>📊</span>
          <span style={{ fontSize: "0.9rem", fontWeight: "600", textAlign: "center" }}>Property File Integration</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", flex: 1, minWidth: "120px" }}>
          <span style={{ fontSize: "1.5rem" }}>🔧</span>
          <span style={{ fontSize: "0.9rem", fontWeight: "600", textAlign: "center" }}>Multi-format Support</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", flex: 1, minWidth: "120px" }}>
          <span style={{ fontSize: "1.5rem" }}>🤖</span>
          <span style={{ fontSize: "0.9rem", fontWeight: "600", textAlign: "center" }}>AI Intelligence</span>
          {/* <span style={{ fontSize: "0.75rem", opacity: 0.9, textAlign: "center" }}>Smart content generation</span> */}
        </div>
      </div>

      <form onSubmit={onLocalSubmit} style={{ marginBottom: "20px", maxWidth: 600, margin: "0 auto" }}>
        {/* API Type */}
        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>API Type: <span style={{ color: "#E74C3C" }}>*</span></label>
          <RadioGroup 
            apiType={apiType} 
            setApiType={setApiType}
          />
        </div>

        {/* ESB Org and Wiki Space Key in one row */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "15px" }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>ESB Org: <span style={{ color: "#E74C3C" }}>*</span></label>
            <GitOrgDropdown
              gitOrgs={gitOrgs}
              setGitOrgs={setGitOrgs}
              selectedGitOrg={selectedGitOrg}
              setSelectedGitOrg={setSelectedGitOrg}
              style={fieldStyle}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Wiki Space Key: <span style={{ color: "#E74C3C" }}>*</span></label>
            <WikiSpaceKeyDropdown
              wikiSpaceKey={pageData.wikiSpaceKey}
              setWikiSpaceKey={(value) => setPageData({ ...pageData, wikiSpaceKey: value })}
              wikiSpaceKeys={wikiSpaceKeys}
              setWikiSpaceKeys={setWikiSpaceKeys}
              style={fieldStyle}
            />
          </div>
        </div>

        {/* Fetch Property File */}
        <FetchPropertyFileRadio
          fetchPropertyFile={fetchPropertyFile}
          setFetchPropertyFile={setFetchPropertyFile}
          selectedGitOrg={selectedGitOrg}
          labelStyle={labelStyle}
        />

        {/* Page Title */}
        <div style={{ marginBottom: "15px", width: "100%" }}>
          <label style={labelStyle}>Page Title: <span style={{ color: "#E74C3C" }}>*</span></label>
          <TitleInput
            value={pageData.pageToBeCreatedTitle}
            onChange={(e) => setPageData({ ...pageData, pageToBeCreatedTitle: e.target.value })}
            style={fieldStyle}
          />
        </div>

        {/* Parent Page Title */}
        <div style={{ marginBottom: "15px", width: "100%" }}>
          <label style={labelStyle}>Parent Page Title: <span style={{ color: "#E74C3C" }}>*</span></label>
          <ParentPageTitleDropdown
            value={pageData.pageToBeCreatedParentPageTitle}
            setValue={(val) => setPageData({ ...pageData, pageToBeCreatedParentPageTitle: val })}
            style={fieldStyle}
          />
        </div>

        {/* App Name */}
        <div style={{ marginBottom: "15px", width: "100%" }}>
          <label style={labelStyle}>App Name: <span style={{ color: "#E74C3C" }}>*</span></label>
          <input
            type="text"
            value={pageData.appName}
            onChange={(e) => setPageData({ ...pageData, appName: e.target.value })}
            style={{
              ...fieldStyle,
              "&:focus": {
                borderColor: "#3498DB",
                boxShadow: "0 0 0 3px rgba(52, 152, 219, 0.1)",
                outline: "none",
              }
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#3498DB";
              e.target.style.boxShadow = "0 0 0 3px rgba(52, 152, 219, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#BDC3C7";
              e.target.style.boxShadow = "none";
            }}
            required
          />
        </div>

        {/* File Upload Options */}
        <div style={{ marginBottom: "25px", width: "100%" }}>
          <h3 style={{ 
            color: "#2C3E50", 
            fontSize: "1.1rem", 
            fontWeight: "600", 
            marginBottom: "20px",
            textAlign: "center",
            borderBottom: "2px solid #3498DB",
            paddingBottom: "10px"
          }}>📁 Document Upload Options</h3>
          
          {/* Grid layout for upload options */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr", 
            gap: "20px",
            "@media (min-width: 768px)": {
              gridTemplateColumns: "1fr 1fr"
            }
          }}>
            
            {/* TDD/IRD Upload */}
            <div style={{ 
              padding: "15px", 
              border: "1px solid #E1E8ED", 
              borderRadius: "10px",
              background: "linear-gradient(145deg, #F8F9FA, #FFFFFF)",
              boxShadow: "0 2px 8px rgba(52, 152, 219, 0.1)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <span style={{ fontSize: "1.2rem" }}>📋</span>
                <label style={{ ...labelStyle, marginBottom: "0", fontSize: "0.9rem" }}>
                  TDD/IRD Documents
                </label>
              </div>
              <FileInput
                onFileChange={handleTddIrdFileChange}
                accept=".txt,.json,.xml,.properties,.yaml,.yml,.md,.csv,.pdf,.doc,.docx"
                multiple={true}
                label="Choose files"
                id="tdd-ird-files"
                style={{ width: "100%" }}
              />
              <div style={{ fontSize: "11px", color: "#7F8C8D", marginTop: "6px", lineHeight: "1.3" }}>
                Technical Design Documents, Interface Requirements
              </div>
            </div>

            {/* Postman Collection/TUT Upload */}
            <div style={{ 
              padding: "15px", 
              border: "1px solid #E1E8ED", 
              borderRadius: "10px",
              background: "linear-gradient(145deg, #F8F9FA, #FFFFFF)",
              boxShadow: "0 2px 8px rgba(52, 152, 219, 0.1)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <span style={{ fontSize: "1.2rem" }}>🔧</span>
                <label style={{ ...labelStyle, marginBottom: "0", fontSize: "0.9rem" }}>
                  Postman/TUT
                </label>
              </div>
              <FileInput
                onFileChange={handlePostmanFileChange}
                accept=".json,.txt,.yaml,.yml,.md"
                multiple={true}
                label="Choose files"
                id="postman-files"
                style={{ width: "100%" }}
              />
              <div style={{ fontSize: "11px", color: "#7F8C8D", marginTop: "6px", lineHeight: "1.3" }}>
                Postman Collections, Test Use Cases, API Testing
              </div>
            </div>

            {/* Communication Docs Upload - spans full width */}
            <div style={{ 
              padding: "15px", 
              border: "1px solid #E1E8ED", 
              borderRadius: "10px",
              background: "linear-gradient(145deg, #F8F9FA, #FFFFFF)",
              boxShadow: "0 2px 8px rgba(52, 152, 219, 0.1)",
              gridColumn: "1 / -1"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <span style={{ fontSize: "1.2rem" }}>💬</span>
                <label style={{ ...labelStyle, marginBottom: "0", fontSize: "0.9rem" }}>
                  Communication Documents
                </label>
              </div>
              <FileInput
                onFileChange={handleCommFileChange}
                accept=".txt,.json,.xml,.properties,.yaml,.yml,.md,.csv,.pdf,.doc,.docx"
                multiple={true}
                label="Choose files"
                id="comm-files"
                style={{ width: "100%" }}
              />
              <div style={{ fontSize: "11px", color: "#7F8C8D", marginTop: "6px", lineHeight: "1.3" }}>
                Email threads, Meeting notes, Requirements documentation, Specifications
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          style={{
            display: "block",
            width: "100%",
            padding: "15px 20px",
            background: "linear-gradient(145deg, #3498DB, #2980B9)",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "1.1rem",
            transition: "all 0.3s ease",
            boxShadow: "0 8px 20px rgba(52, 152, 219, 0.3)",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 12px 25px rgba(52, 152, 219, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 8px 20px rgba(52, 152, 219, 0.3)";
          }}
        >
          Generate
        </button>
      </form>

      {/* In Progress Message */}
      {inProgress && (
        <div style={{ 
          marginTop: "25px", 
          color: "#8E44AD", 
          background: "linear-gradient(145deg, #F8F9FA, #ECF0F1)", 
          padding: "18px", 
          borderRadius: "12px",
          border: "2px solid #D5DBDB",
          boxShadow: "0 5px 15px rgba(142, 68, 173, 0.1)",
        }}>
          {statusMessage}
        </div>
      )}

      {/* Show only message and pageURL in different colors if response is success */}
      {!inProgress && response && response.status === "success" && (
        <div style={{ 
          marginTop: "25px", 
          padding: "18px", 
          borderRadius: "12px", 
          background: "linear-gradient(145deg, #D5F4E6, #A3E4C7)",
          border: "2px solid #27AE60",
          boxShadow: "0 8px 20px rgba(39, 174, 96, 0.15)",
        }}>
          <div style={{ fontWeight: "600", color: "#1E8449", fontSize: "1.05rem" }}>
            {response.message}
          </div>
          {response.pageURL && (
            <div style={{ marginTop: "10px" }}>
              <a
                href={response.pageURL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  color: "#2980B9", 
                  textDecoration: "none", 
                  fontWeight: "600",
                  borderBottom: "2px solid #3498DB",
                  paddingBottom: "2px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#1ABC9C";
                  e.target.style.borderBottomColor = "#1ABC9C";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#2980B9";
                  e.target.style.borderBottomColor = "#3498DB";
                }}
              >
                {response.pageURL}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Error or other status */}
      {!inProgress && statusMessage && response?.status !== "success" && (
        <div style={{ 
          marginTop: "25px", 
          color: "#C0392B", 
          background: "linear-gradient(145deg, #FADBD8, #F1948A)", 
          padding: "18px", 
          borderRadius: "12px",
          border: "2px solid #E74C3C",
          boxShadow: "0 8px 20px rgba(231, 76, 60, 0.15)",
        }}>
          {statusMessage}
        </div>
      )}

      {/* Help section at the bottom */}
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <span style={{ color: "#7F8C8D", fontSize: "0.95rem" }}>Need help? </span>
        <a
          href="https://wiki.ith.intel.com/pages/viewpage.action?pageId=4220987963"
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            color: "#3498DB", 
            textDecoration: "none", 
            fontWeight: "600",
            borderBottom: "2px solid #3498DB",
            paddingBottom: "2px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#2980B9";
            e.target.style.borderBottomColor = "#2980B9";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#3498DB";
            e.target.style.borderBottomColor = "#3498DB";
          }}
        >
          Visit the Help Page
        </a>
      </div>
      </div>
    </div>
  );
}

export default WikiGeneration;