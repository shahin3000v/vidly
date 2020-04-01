import React from "react";

const Select = ({ name, label, value, onChange, error, options }) => {
  const errorStyle = { width: "fit-content" };
  const widthStyle = { width: 400 };
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        value={value}
        style={widthStyle}
        onChange={onChange}
        id={name}
        options={options}
        className="form-control"
      >
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && (
        <small style={errorStyle} className="form-text alert-danger">
          {error}
        </small>
      )}
    </div>
  );
};

export default Select;
