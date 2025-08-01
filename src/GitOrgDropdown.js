import React, { useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "./config";

function GitOrgDropdown({ gitOrgs, setGitOrgs, selectedGitOrg, setSelectedGitOrg, style }) {
  useEffect(() => {
    const fetchGitOrgs = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.GIT_ORGS);
        setGitOrgs(res.data);
      } catch (error) {
        console.error("Error fetching GIT APT Orgs:", error.message);
      }
    };
    fetchGitOrgs();
  }, [setGitOrgs]);

  return (
    <div>
      <select
        value={selectedGitOrg}
        onChange={(e) => setSelectedGitOrg(e.target.value)}
        required
        style={style}
      >
        <option value="">Select Org</option>
        {gitOrgs.map((org, idx) => (
          <option key={idx} value={org.name || org}>
            {org.displayName || org.name || org}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GitOrgDropdown;