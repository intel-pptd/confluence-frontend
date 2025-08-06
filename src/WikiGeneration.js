import React, { useState } from "react";
import RadioGroup from "./RadioGroup";
import GitOrgDropdown from "./GitOrgDropdown";
import TitleInput from "./TitleInput";
import ParentPageTitleDropdown from "./ParentPageTitleDropdown";
import WikiSpaceKeyDropdown from "./WikiSpaceKeyDropdown";
import FileInput from "./FileInput";
import FetchPropertyFileRadio from "./FetchPropertyFileRadio";
import ContactsSection from './ContactsSection';

// Update the WikiGeneration component with full-page layout
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
  onNavigateHome,
}) {
  const containerStyle = {
    padding: "20px",
    maxWidth: "100%",
    width: "100%",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)",
  };

  const sectionStyle = {
    background: "linear-gradient(145deg, #FFFFFF, #F8F9FA)",
    borderRadius: "15px",
    padding: "25px",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
    border: "1px solid #E2E8F0",
    marginBottom: "25px",
  };

  // Common label style
  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#2D3748",
    fontSize: "14px",
  };

  // Shared style for text fields
  const fieldStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #E2E8F0",
    borderRadius: "8px",
    fontSize: "14px",
    transition: "all 0.3s ease",
    background: "#FFFFFF",
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
        
        // Team Contact Information
        l0ProductionSupport: pageData.l0ProductionSupport,
        l0ProductionSupportEmail: pageData.l0ProductionSupportEmail,
        l2MulesoftSupport: pageData.l2MulesoftSupport,
        l2MulesoftSupportEmail: pageData.l2MulesoftSupportEmail,
        integrationDevTeam: pageData.integrationDevTeam,
        integrationDevTeamEmail: pageData.integrationDevTeamEmail,
        businessTeam: pageData.businessTeam,
        businessTeamEmail: pageData.businessTeamEmail,
        
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
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* Main Content Area - Full Width */}
      <div style={containerStyle}>
        {/* Header with Navigation */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          background: "linear-gradient(135deg, #3498DB 0%, #9B59B6 50%, #E74C3C 100%)",
          borderRadius: "15px",
          padding: "25px",
          color: "white",
        }}>
          <div>
            <h1 style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              margin: 0,
            }}>
              🚀 Intelligent Wiki Generation
            </h1>
            <p style={{
              fontSize: "1.1rem",
              margin: 0,
              opacity: 0.9,
            }}>
              Generate comprehensive Confluence pages with AI-powered content creation
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <button
              style={{
                color: "#fff",
                background: "rgba(255, 255, 255, 0.2)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                padding: "12px 24px",
                cursor: "pointer",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "1rem",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backdropFilter: "blur(10px)",
              }}
              onClick={onNavigateHome}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.3)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              ← Back to Home
            </button>
          </div>
        </div>

        <form onSubmit={onLocalSubmit} style={{ width: "100%" }}>
          {/* Main Configuration Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "25px",
            marginBottom: "30px",
          }}>
            
            {/* API Configuration Section */}
            <div style={sectionStyle}>
              <h3 style={{
                color: "#2C3E50",
                fontSize: "1.2rem",
                fontWeight: "600",
                marginBottom: "20px",
                borderBottom: "2px solid #3498DB",
                paddingBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
                🔧 API Configuration
              </h3>
              
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>API Type: <span style={{ color: "#E74C3C" }}>*</span></label>
                <RadioGroup apiType={apiType} setApiType={setApiType} />
              </div>

              <div>
                <label style={labelStyle}>ESB Organization: <span style={{ color: "#E74C3C" }}>*</span></label>
                <GitOrgDropdown
                  gitOrgs={gitOrgs}
                  setGitOrgs={setGitOrgs}
                  selectedGitOrg={selectedGitOrg}
                  setSelectedGitOrg={setSelectedGitOrg}
                  style={fieldStyle}
                />
              </div>
            </div>

            {/* Wiki Configuration Section */}
            <div style={sectionStyle}>
              <h3 style={{
                color: "#2C3E50",
                fontSize: "1.2rem",
                fontWeight: "600",
                marginBottom: "20px",
                borderBottom: "2px solid #9B59B6",
                paddingBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
                📚 Wiki Configuration
              </h3>
              
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Wiki Space Key: <span style={{ color: "#E74C3C" }}>*</span></label>
                <WikiSpaceKeyDropdown
                  wikiSpaceKey={pageData.wikiSpaceKey}
                  setWikiSpaceKey={(value) => setPageData({ ...pageData, wikiSpaceKey: value })}
                  wikiSpaceKeys={wikiSpaceKeys}
                  setWikiSpaceKeys={setWikiSpaceKeys}
                  style={fieldStyle}
                />
              </div>

              <div>
                <FetchPropertyFileRadio
                  fetchPropertyFile={fetchPropertyFile}
                  setFetchPropertyFile={setFetchPropertyFile}
                  selectedGitOrg={selectedGitOrg}
                  labelStyle={labelStyle}
                />
              </div>
            </div>

            {/* Page Details Section */}
            <div style={sectionStyle}>
              <h3 style={{
                color: "#2C3E50",
                fontSize: "1.2rem",
                fontWeight: "600",
                marginBottom: "20px",
                borderBottom: "2px solid #E74C3C",
                paddingBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
                📄 Page Details
              </h3>
              
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Page Title: <span style={{ color: "#E74C3C" }}>*</span></label>
                <TitleInput
                  value={pageData.pageToBeCreatedTitle}
                  onChange={(e) => setPageData({ ...pageData, pageToBeCreatedTitle: e.target.value })}
                  style={{
                    ...fieldStyle,
                    width: "90%",
                    maxWidth: "400px",
                  }}
                />
              </div>

              <div>
                <label style={labelStyle}>Parent Page: <span style={{ color: "#E74C3C" }}>*</span></label>
                <ParentPageTitleDropdown
                  value={pageData.pageToBeCreatedParentPageTitle}
                  setValue={(val) => setPageData({ ...pageData, pageToBeCreatedParentPageTitle: val })}
                  style={{
                    ...fieldStyle,
                    width: "90%",
                    maxWidth: "400px",
                  }}
                />
              </div>
            </div>

            {/* Application Section */}
            <div style={sectionStyle}>
              <h3 style={{
                color: "#2C3E50",
                fontSize: "1.2rem",
                fontWeight: "600",
                marginBottom: "20px",
                borderBottom: "2px solid #27AE60",
                paddingBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
                🎯 Application
              </h3>
              
              <div>
                <label style={labelStyle}>App Name: <span style={{ color: "#E74C3C" }}>*</span></label>
                <input
                  type="text"
                  value={pageData.appName}
                  onChange={(e) => setPageData({ ...pageData, appName: e.target.value })}
                  style={{
                    ...fieldStyle,
                    width: "90%",
                    maxWidth: "400px",
                  }}
                  required
                  placeholder="Enter your application name"
                />
              </div>
            </div>
          </div>

          {/* Contacts Section - New Addition */}
          <ContactsSection 
            pageData={pageData}
            setPageData={setPageData}
            labelStyle={labelStyle}
            sectionStyle={sectionStyle}
          />

          {/* File Upload Section */}
          <div style={{
            ...sectionStyle,
            marginBottom: "30px",
          }}>
            <h3 style={{
              color: "#2C3E50",
              fontSize: "1.3rem",
              fontWeight: "600",
              marginBottom: "25px",
              textAlign: "center",
              borderBottom: "3px solid #3498DB",
              paddingBottom: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}>
              📁 Document Upload Categories
            </h3>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "25px",
            }}>
              
              {/* TDD/IRD Documents */}
              <div style={{
                padding: "20px",
                border: "2px solid #3498DB",
                borderRadius: "12px",
                background: "linear-gradient(145deg, #EBF3FD, #FFFFFF)",
                transition: "all 0.3s ease",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                  <span style={{ fontSize: "1.5rem" }}>📋</span>
                  <label style={{ ...labelStyle, marginBottom: "0", fontSize: "1rem", color: "#3498DB" }}>
                    TDD/IRD Documents
                  </label>
                </div>
                <FileInput
                  onFileChange={handleTddIrdFileChange}
                  accept=".txt,.json,.xml,.properties,.yaml,.yml,.md,.csv,.pdf,.doc,.docx"
                  multiple={true}
                  label="Choose TDD/IRD files"
                  id="tdd-ird-files"
                  style={{ width: "100%" }}
                />
                <div style={{ fontSize: "12px", color: "#7F8C8D", marginTop: "10px", lineHeight: "1.4" }}>
                  Technical Design Documents, Interface Requirements, API Specifications
                </div>
              </div>

              {/* Postman/TUT Files */}
              <div style={{
                padding: "20px",
                border: "2px solid #3498DB", // Changed from #9B59B6 to match TDD/IRD
                borderRadius: "12px",
                background: "linear-gradient(145deg, #EBF3FD, #FFFFFF)", // Changed from #F4F1F8 to match TDD/IRD
                transition: "all 0.3s ease",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                  <span style={{ fontSize: "1.5rem" }}>🔧</span>
                  <label style={{ ...labelStyle, marginBottom: "0", fontSize: "1rem", color: "#3498DB" }}> {/* Changed from #9B59B6 to #3498DB */}
                    Postman/TUT Files
                  </label>
                </div>
                <FileInput
                  onFileChange={handlePostmanFileChange}
                  accept=".json,.txt,.yaml,.yml,.md"
                  multiple={true}
                  label="Choose Postman files"
                  id="postman-files"
                  style={{ width: "100%" }}
                />
                <div style={{ fontSize: "12px", color: "#7F8C8D", marginTop: "10px", lineHeight: "1.4" }}>
                  Postman Collections, Test Use Cases, API Testing Documentation
                </div>
              </div>

              {/* Communication Documents */}
              <div style={{
                padding: "20px",
                border: "2px solid #3498DB", // Changed from #E74C3C to match TDD/IRD
                borderRadius: "12px",
                background: "linear-gradient(145deg, #EBF3FD, #FFFFFF)", // Changed from #FDEAEA to match TDD/IRD
                transition: "all 0.3s ease",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                  <span style={{ fontSize: "1.5rem" }}>💬</span>
                  <label style={{ ...labelStyle, marginBottom: "0", fontSize: "1rem", color: "#3498DB" }}> {/* Changed from #E74C3C to #3498DB */}
                    Communication Docs
                  </label>
                </div>
                <FileInput
                  onFileChange={handleCommFileChange}
                  accept=".txt,.json,.xml,.properties,.yaml,.yml,.md,.csv,.pdf,.doc,.docx"
                  multiple={true}
                  label="Choose Communication files"
                  id="comm-files"
                  style={{ width: "100%" }}
                />
                <div style={{ fontSize: "12px", color: "#7F8C8D", marginTop: "10px", lineHeight: "1.4" }}>
                  Email threads, Meeting notes, Requirements, Business Specifications
                </div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <button
              type="submit"
              style={{
                padding: "18px 60px",
                background: "linear-gradient(145deg, #3498DB, #2980B9)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "1.2rem",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 25px rgba(52, 152, 219, 0.4)",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                minWidth: "300px",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 15px 35px rgba(52, 152, 219, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 10px 25px rgba(52, 152, 219, 0.4)";
              }}
            >
              🚀 Generate Wiki Page
            </button>
          </div>
        </form>

        {/* Status and Response Messages */}
        {inProgress && (
          <div style={{
            ...sectionStyle,
            background: "linear-gradient(145deg, #FFF9E6, #FFFBF0)",
            border: "2px solid #F39C12",
            textAlign: "center",
            color: "#8E44AD",
            fontSize: "1.1rem",
            fontWeight: "600",
          }}>
            ⏳ {statusMessage}
          </div>
        )}

        {!inProgress && response && response.status === "success" && (
          <div style={{
            ...sectionStyle,
            background: "linear-gradient(145deg, #D5F4E6, #A3E4C7)",
            border: "2px solid #27AE60",
            textAlign: "center",
          }}>
            <div style={{ fontWeight: "600", color: "#1E8449", fontSize: "1.1rem", marginBottom: "15px" }}>
              ✅ {response.message}
            </div>
            {response.pageURL && (
              <a
                href={response.pageURL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#2980B9",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "1rem",
                  borderBottom: "2px solid #3498DB",
                  paddingBottom: "2px",
                  transition: "all 0.3s ease",
                }}
              >
                🔗 View Generated Page
              </a>
            )}
          </div>
        )}

        {!inProgress && statusMessage && response?.status !== "success" && (
          <div style={{
            ...sectionStyle,
            background: "linear-gradient(145deg, #FADBD8, #F1948A)",
            border: "2px solid #E74C3C",
            textAlign: "center",
            color: "#C0392B",
            fontSize: "1.1rem",
            fontWeight: "600",
          }}>
            ❌ {statusMessage}
          </div>
        )}

        {/* Help Section */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <span style={{ color: "#7F8C8D", fontSize: "1rem" }}>Need assistance? </span>
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
          >
            📖 Visit Help Documentation
          </a>
        </div>
      </div>
    </div>
  );
}

export default WikiGeneration;