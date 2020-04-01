import React from "react";

const Input = ({ name, label, value, onChange, error, type }) => {
  const errorStyle = { width: "fit-content" };
  const widthStyle = { width: 400 };
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        style={widthStyle}
        onChange={onChange}
        id={name}
        type={type}
        className="form-control"
      />
      {error && (
        <small style={errorStyle} className="form-text alert-danger">
          {error}
        </small>
      )}
    </div>
  );
};

export default Input;
