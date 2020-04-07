import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      name="query"
      placeholder="Search..."
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
      className="form-control my-1"
    />
  );
};

export default SearchBox;
