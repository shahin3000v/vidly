import React, { Component } from "react";
import Form from "./common/form";

class NewMovieForm extends Form {
  /*   doSubmit = e => {
    const movie = {};
    console.log(e.target[1]);
    for (let i = 0; i < e.target.length - 1; i++)
      movie[e.target[i].id] = e.target[i].value;

    //call backend
    console.log(movie);
    console.log("submitted");
  }; */
  render() {
    return (
      <React.Fragment>
        <h1>Add New Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("genre", "Genre")}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Add Movie")}
        </form>
      </React.Fragment>
    );
  }
}

export default NewMovieForm;
