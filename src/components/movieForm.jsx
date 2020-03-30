import React, { Component } from "react";

class MovieForm extends Component {
  handleSave = () => {
    this.props.history.replace("/movies");
  };
  render() {
    return (
      <div>
        <h1>{this.props.match.params.movieId}</h1>
        <button
          onClick={this.handleSave}
          type="button"
          className="btn btn-primary"
        >
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
