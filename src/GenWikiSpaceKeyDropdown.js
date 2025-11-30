
import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { API_ENDPOINTS } from "./config";

function GenWikiSpaceKeyDropdown({
  wikiSpaceKey,
  setWikiSpaceKey,
  wikiSpaceKeys,
  setWikiSpaceKeys,
  placeholder = "Select Wiki Space Key",
  autoFetch = true,
}) {
  const [internalKeys, setInternalKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const keys = wikiSpaceKeys && wikiSpaceKeys.length > 0 ? wikiSpaceKeys : internalKeys;

  useEffect(() => {
    if (!autoFetch || (wikiSpaceKeys && wikiSpaceKeys.length > 0)) return;
    setLoading(true);
    const token = localStorage.getItem('authToken');
    const headers = token ? { Authorization: `Basic ${token}` } : {};
    axios
      .get(API_ENDPOINTS.GEN_WIKI_SPACE_KEYS, { headers })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        if (setWikiSpaceKeys) setWikiSpaceKeys(data);
        else setInternalKeys(data);
      })
      .catch((err) => console.error("Error fetching Wiki Space Keys:", err))
      .finally(() => setLoading(false));
  }, [autoFetch, wikiSpaceKeys, setWikiSpaceKeys]);

  const options = keys.map((k) => ({ value: k, label: k }));

  const selectedOption = options.find((o) => o.value === wikiSpaceKey) || null;

  return (
    <Select
      isLoading={loading}
      options={options}
      value={selectedOption}
      onChange={(opt) => setWikiSpaceKey(opt?.value || "")}
      placeholder={placeholder}
      isClearable
      isSearchable
      styles={{
        container: (base) => ({ ...base, width: "100%" }),
      }}
    />
  );
}

export default GenWikiSpaceKeyDropdown;
