import React from 'react';
import SavedResult from "../components/SavedResult/SavedResult";

export default function SavedOrgsPage({ savedResults, setSavedResults }) {
  return (
    <div className="orgs">
      {
        savedResults.map((org, i) => (
          <SavedResult org={org}
                       key={i}
                       setSavedResults={setSavedResults}
                       savedResults={savedResults}
          />
        ))
      }
    </div>
  )
}
