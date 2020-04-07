import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validatePropertyWithJoi = ({ id, value }) => {
    const obj = { [id]: value };
    const schema = { [id]: this.schema[id] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    if (errors) {
      this.setState({ errors });
      return; //don't do backend calls
    }
    //do backend calls if no errors
    this.doSubmit();
  };
  handleChange = (e) => {
    let data = this.state.data;
    let errors = this.state.errors;
    const propertyError = this.validatePropertyWithJoi(e.currentTarget);
    if (propertyError) errors[e.currentTarget.id] = propertyError;
    else delete errors[e.currentTarget.id];
    data[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ data, errors });
  };
  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };
  renderInput = (name, label, type = "text") => {
    return (
      <Input
        name={name}
        type={type}
        label={label}
        value={this.state.data[name]}
        onChange={this.handleChange}
        error={this.state.errors[name]}
      />
    );
  };
  renderSelect = (name, label, options) => {
    return (
      <Select
        name={name}
        options={options}
        label={label}
        value={this.state.data[name]}
        onChange={this.handleChange}
        error={this.state.errors[name]}
      />
    );
  };
}

export default Form;
