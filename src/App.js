import React, { useState } from "react";
// Remove unused imports
import HomePage from "./HomePage";
import WikiGeneration from "./WikiGeneration";
import GenericWikiGeneration from "./GenericWikiGeneration";
import { BACKEND_DOMAIN, API_ENDPOINTS } from "./config";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showGenForm, setShowGenForm] = useState(false);  
  const [pageData, setPageData] = useState({
    pageToBeCreatedTitle: "",
    pageToBeCreatedParentPageTitle: "",
    wikiSpaceKey: "",
    appName: "",
    gitOrg: "",
    apiType: "MuleSoft", // Sync with default radio selection
    fetchPropertyFile: "No"  // Added here
  });
  const [response, setResponse] = useState(null);
  const [gitOrgs, setGitOrgs] = useState([]);
  const [selectedGitOrg, setSelectedGitOrg] = useState("");
  const [apiType, setApiType] = useState("MuleSoft"); // Default to MuleSoft (matches RadioGroup value)
  const [wikiSpaceKeys, setWikiSpaceKeys] = useState([]);

  // Function to clear response
  const clearResponse = () => {
    setResponse(null);
  };
  
  // Alternative approach: Add file metadata
  
  const handleSubmit = async (formDataWithFiles) => {
  const hasFiles = formDataWithFiles.hasFiles;
  const audience = formDataWithFiles.audience;
  if(audience){
    const token = localStorage.getItem("authToken");
    if (hasFiles) {      
      const data = new FormData();      
      // Add form fields for generic wiki
      data.append('documentType',formDataWithFiles.documentType);
      data.append('productName',formDataWithFiles.productName);
      data.append('productDescription',formDataWithFiles.productDescription);
      data.append('audience',formDataWithFiles.audience);
      data.append('purpose',formDataWithFiles.purpose);
      data.append('tone',formDataWithFiles.tone);      
      data.append('hasFiles',formDataWithFiles.hasFiles);
      data.append('wikiSpaceKey', formDataWithFiles.wikiSpaceKey);
      data.append('pageToBeCreatedTitle', formDataWithFiles.pageToBeCreatedTitle);
      data.append('pageToBeCreatedParentPageTitle', formDataWithFiles.pageToBeCreatedParentPageTitle);
      data.append('integrationDevTeam', formDataWithFiles.integrationDevTeam);
      data.append('integrationDevTeamEmail', formDataWithFiles.integrationDevTeamEmail);
      data.append('businessTeam', formDataWithFiles.businessTeam);
      data.append('businessTeamEmail', formDataWithFiles.businessTeamEmail);    
     
      if (formDataWithFiles.selectedCommFiles && formDataWithFiles.selectedCommFiles.length > 0) {
        formDataWithFiles.selectedCommFiles.forEach(file => {
          data.append('commFiles', file); // Specific field name for Communication
        });
      }      
      const response = await fetch(`${API_ENDPOINTS.GEN_WIKI_GENERATE_CONFLUENCE}`, {
        method: 'POST',
        headers:{
                "Authorization": `Basic ${token}`
                },
        body: data
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Set the response for display in UI
      const result = await response.json();
      
      // Normalize the response format to match UI expectations
      const normalizedResult = {
        status: "success",
        message: result.message,           // "Confluence page generated successfully"
        pageURL: result.pageUrl            // Your actual wiki URL
      };
      
      setResponse(normalizedResult);
      return normalizedResult;
    } else {
      // Send JSON request without files
      const response = await fetch(`${API_ENDPOINTS.GEN_WIKI_GENERATE_CONFLUENCE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Basic ${token}`
        },
        body: JSON.stringify({
          documentType:formDataWithFiles.documentType,
          productName:formDataWithFiles.productName,
          productDescription:formDataWithFiles.productDescription,
          audience:formDataWithFiles.audience,
          purpose:formDataWithFiles.purpose,
          tone:formDataWithFiles.tone,      
          hasFiles:formDataWithFiles.hasFiles,
          wikiSpaceKey: formDataWithFiles.wikiSpaceKey,
          pageToBeCreatedTitle: formDataWithFiles.pageToBeCreatedTitle,
          pageToBeCreatedParentPageTitle: formDataWithFiles.pageToBeCreatedParentPageTitle,
          integrationDevTeam: formDataWithFiles.integrationDevTeam,
          integrationDevTeamEmail: formDataWithFiles.integrationDevTeamEmail,
          businessTeam: formDataWithFiles.businessTeam,
          businessTeamEmail: formDataWithFiles.businessTeamEmail
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Set the response for display in UI
      const result = await response.json();
      
      // Normalize the response format to match UI expectations
      const normalizedResult = {
        status: "success",
        message: result.message,           // "Confluence page generated successfully"
        pageURL: result.pageUrl            // Your actual wiki URL
      };
      
      setResponse(normalizedResult);
      return normalizedResult;
    }
  }else{ 
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
      data.append('l0ProductionSupport', formDataWithFiles.l0ProductionSupport);
      data.append('l0ProductionSupportEmail', formDataWithFiles.l0ProductionSupportEmail);
      data.append('l2MulesoftSupport', formDataWithFiles.l2MulesoftSupport);
      data.append('l2MulesoftSupportEmail', formDataWithFiles.l2MulesoftSupportEmail);
      data.append('integrationDevTeam', formDataWithFiles.integrationDevTeam);
      data.append('integrationDevTeamEmail', formDataWithFiles.integrationDevTeamEmail);
      data.append('businessTeam', formDataWithFiles.businessTeam);
      data.append('businessTeamEmail', formDataWithFiles.businessTeamEmail);
      
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
      
      // Normalize the response format to match UI expectations
      const normalizedResult = {
        status: "success",
        message: result.message,           // "Confluence page generated successfully"
        pageURL: result.pageUrl            // Your actual wiki URL
      };
      
      setResponse(normalizedResult);
      return normalizedResult;
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
          appName: formDataWithFiles.appName,
          l0ProductionSupport: formDataWithFiles.l0ProductionSupport,
          l0ProductionSupportEmail: formDataWithFiles.l0ProductionSupportEmail,
          l2MulesoftSupport: formDataWithFiles.l2MulesoftSupport,
          l2MulesoftSupportEmail: formDataWithFiles.l2MulesoftSupportEmail,
          integrationDevTeam: formDataWithFiles.integrationDevTeam,
          integrationDevTeamEmail: formDataWithFiles.integrationDevTeamEmail,
          businessTeam: formDataWithFiles.businessTeam,
          businessTeamEmail: formDataWithFiles.businessTeamEmail
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Set the response for display in UI
      const result = await response.json();
      
      // Normalize the response format to match UI expectations
      const normalizedResult = {
        status: "success",
        message: result.message,           // "Confluence page generated successfully"
        pageURL: result.pageUrl            // Your actual wiki URL
      };
      
      setResponse(normalizedResult);
      return normalizedResult;
    } }
  };  return (
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
          clearResponse={clearResponse}
          onNavigateHome={() => setShowForm(false)}
        />
      ) : showGenForm ? (
        <GenericWikiGeneration
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
          clearResponse={clearResponse}
          onNavigateHome={() => setShowGenForm(false)}
        />
      ):(
        <HomePage onStart={() => setShowForm(true)}
                  onGenStart={() => setShowGenForm(true)} />
      )}           
    </>
  );
}

export default App;
