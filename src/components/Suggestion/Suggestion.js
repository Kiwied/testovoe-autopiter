import React from "react";

import './Suggestion.css';

export default function Suggestion({ data, setResult, setIsInputFocused }) {
  const handleSelect = () => {
    setResult(data);
    setIsInputFocused(false);
  }

  return (
    <div className="suggestion" onClick={handleSelect}>
      <h3 className="suggestion__name">{data.value}</h3>
      <p className="suggestion__info">
        {data.data.inn} {data.data.address.data.region_with_type}
      </p>
    </div>
  )
}
