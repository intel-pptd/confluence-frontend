import React, { useState } from "react";
// Remove unused imports
import HomePage from "./HomePage";
import WikiGeneration from "./WikiGeneration";
import { BACKEND_DOMAIN } from "./config";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [pageData, setPageData] = useState({
    pageToBeCreatedTitle: "",
    pageToBeCreatedParentPageTitle: "",
    wikiSpaceKey: "",
    appName: "",
    gitOrg: "",
    apiType: "",
    fetchPropertyFile: "No"  // Added here
  });
  const [response, setResponse] = useState(null);
  const [gitOrgs, setGitOrgs] = useState([]);
  const [selectedGitOrg, setSelectedGitOrg] = useState("");
  const [apiType, setApiType] = useState("mulesoft"); // Set the default to "mulesoft"
  const [wikiSpaceKeys, setWikiSpaceKeys] = useState([]);

  // Alternative approach: Add file metadata
  const handleSubmit = async (formDataWithFiles) => {
    const hasFiles = formDataWithFiles.hasFiles;
    
    if (hasFiles) {
      const data = new FormData();
      
      // Add form fields
      data.append('apiType', formDataWithFiles.apiType);
      data.append('fetchPropertyFile', formDataWithFiles.fetchPropertyFile);
      data.append('selectedGitOrg', formDataWithFiles.selectedGitOrg);
      data.append('wikiSpaceKey', formDataWithFiles.wikiSpaceKey);
      data.append('pageToBeCreatedTitle', formDataWithFiles.pageToBeCreatedTitle);
      data.append('pageToBeCreatedParentPageTitle', formDataWithFiles.pageToBeCreatedParentPageTitle);
      data.append('appName', formDataWithFiles.appName);
      
      // Add files with CATEGORY-SPECIFIC field names
      if (formDataWithFiles.selectedTddIrdFiles && formDataWithFiles.selectedTddIrdFiles.length > 0) {
        formDataWithFiles.selectedTddIrdFiles.forEach(file => {
          data.append('tddIrdFiles', file); // Specific field name for TDD/IRD
        });
      }
      
      if (formDataWithFiles.selectedPostmanFiles && formDataWithFiles.selectedPostmanFiles.length > 0) {
        formDataWithFiles.selectedPostmanFiles.forEach(file => {
          data.append('postmanFiles', file); // Specific field name for Postman
        });
      }
      
      if (formDataWithFiles.selectedCommFiles && formDataWithFiles.selectedCommFiles.length > 0) {
        formDataWithFiles.selectedCommFiles.forEach(file => {
          data.append('commFiles', file); // Specific field name for Communication
        });
      }
      
      const response = await fetch(`${BACKEND_DOMAIN}/generate-confluence`, {
        method: 'POST',
        body: data
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Set the response for display in UI
      const result = await response.json();
      setResponse(result);
      return result;
    } else {
      // Send JSON request without files
      const response = await fetch(`${BACKEND_DOMAIN}/generate-confluence`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          apiType: formDataWithFiles.apiType,
          fetchPropertyFile: formDataWithFiles.fetchPropertyFile,
          selectedGitOrg: formDataWithFiles.selectedGitOrg,
          wikiSpaceKey: formDataWithFiles.wikiSpaceKey,
          pageToBeCreatedTitle: formDataWithFiles.pageToBeCreatedTitle,
          pageToBeCreatedParentPageTitle: formDataWithFiles.pageToBeCreatedParentPageTitle,
          appName: formDataWithFiles.appName
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Set the response for display in UI
      const result = await response.json();
      setResponse(result);
      return result;
    }
  };

  return (
    <>
      {/* Top Nav Section */}
      <div className="container-fluid" style={{ 
        background: "linear-gradient(135deg, #2C3E50 0%, #3498DB 50%, #9B59B6 100%)", 
        padding: "12px 20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)" 
      }}>
      </div>

      {/* Toggle between HomePage and WikiGeneration */}
      {showForm ? (
        <WikiGeneration
          apiType={apiType}
          setApiType={setApiType}
          fetchPropertyFile={pageData.fetchPropertyFile}
          setFetchPropertyFile={(value) => setPageData({ ...pageData, fetchPropertyFile: value })}
          gitOrgs={gitOrgs}
          setGitOrgs={setGitOrgs}
          selectedGitOrg={selectedGitOrg}
          setSelectedGitOrg={setSelectedGitOrg}
          pageData={pageData}
          setPageData={setPageData}
          wikiSpaceKeys={wikiSpaceKeys}
          setWikiSpaceKeys={setWikiSpaceKeys}
          handleSubmit={handleSubmit}
          response={response}
          onNavigateHome={() => setShowForm(false)}
        />
      ) : (
        <HomePage onStart={() => setShowForm(true)} />
      )}
    </>
  );
}

export default App;
