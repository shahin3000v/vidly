import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = id => {
    const movies = this.state.movies.filter(film => film._id !== id);
    this.setState({ movies });
  };
  toggleLikeHandler = film => {
    let movies = [...this.state.movies];
    movies = movies.map(mo => {
      if (mo === film) mo.liked = !mo.liked;
      return mo;
    });
    this.setState({ movies });
  };
  render() {
    const { length } = this.state.movies;
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
              <th>Like</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(film => (
              <tr key={film._id}>
                <td>{film.title}</td>
                <td>{film.genre.name}</td>
                <td>{film.numberInStock}</td>
                <td>{film.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={film.liked}
                    toggleLike={() => this.toggleLikeHandler(film)}
                  />
                </td>
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
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
