// Backend configuration
export const BACKEND_DOMAIN = "https://pptd-automations-backend.intel.com";
//export const BACKEND_DOMAIN = "http://localhost:5000";
//export const BACKEND_DOMAIN = "https://localhost:443/eip-sc-wiki-content-generate-api/v1";

// API endpoints
export const API_ENDPOINTS = {
  GENERATE_CONFLUENCE: `${BACKEND_DOMAIN}/generate-confluence`,
  WIKI_SPACE_KEYS: `${BACKEND_DOMAIN}/wikispacekeys`,
  GIT_ORGS: `${BACKEND_DOMAIN}/gitorgs`,
  GEN_WIKI_SPACE_KEYS: `${BACKEND_DOMAIN}/spacelist`,
  GEN_WIKI_GENERATE_CONFLUENCE: `${BACKEND_DOMAIN}/genericWiki`,
};
