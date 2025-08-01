import React, { useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "./config";

function WikiSpaceKeyDropdown({
  wikiSpaceKey,
  setWikiSpaceKey,
  wikiSpaceKeys,
  setWikiSpaceKeys,
  style, // add a style prop
}) {
  useEffect(() => {
    const fetchWikiSpaceKeys = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.WIKI_SPACE_KEYS);
        setWikiSpaceKeys(res.data);
      } catch (error) {
        console.error("Error fetching Wiki Space Keys:", error.message);
      }
    };
    fetchWikiSpaceKeys();
  }, [setWikiSpaceKeys]);

  return (
    <div>
      <select
        value={wikiSpaceKey}
        onChange={(e) => setWikiSpaceKey(e.target.value)}
        required
        style={style} // apply the style
      >
        <option value="">Select Wiki Space Key</option>
        {wikiSpaceKeys.map((item, idx) => (
          <option key={idx} value={item.key}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default WikiSpaceKeyDropdown;