import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    list: getMovies()
  };
  formatTable = () => {
    return this.state.list.map(film => (
      <tr key={film._id}>
        <td>{film.title}</td>
        <td>{film.genre.name}</td>
        <td>{film.numberInStock}</td>
        <td>{film.dailyRentalRate}</td>
        <td>
          <button
            onClick={() => {
              this.handleDelete(film._id);
            }}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };
  handleDelete = id => {
    const list = this.state.list.filter(film => film._id !== id);
    this.setState({ list });
  };
  render() {
    const { length } = this.state.list;
    if (length === 0)
      return (
        <p className="h4 alert-warning mt-3">There is no record in database!</p>
      );
    return (
      <React.Fragment>
        <p className="h4 alert-success mb-0 mt-3">
          Showing {length} movies in database
        </p>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th>Rate</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>{this.formatTable()}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
