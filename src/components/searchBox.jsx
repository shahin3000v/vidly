import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      name="query"
      placeholder="Search..."
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
      className="form-control"
    />
  );
};

export default SearchBox;
