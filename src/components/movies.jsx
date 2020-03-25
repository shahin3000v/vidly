import React, { Component } from "react";
import Like from "./common/like";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  deleteHandler = id => {
    const movies = this.state.movies.filter(film => film._id !== id);
    this.setState({ movies });
  };
  toggleLikeHandler = film => {
    let movies = this.state.movies;
    movies = movies.map(movie => {
      if (movie === film) movie.liked = !movie.liked;
      return movie;
    });
    this.setState({ movies });
  };
  paginationHandler = page => {
    this.setState({ currentPage: page });
  };
  genreHandler = genre => {
    console.log(genre);
  };
  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, movies: allMovies } = this.state;
    if (count === 0)
      return (
        <p className="h4 alert-warning mt-3">There is no record in database!</p>
      );
    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            onGenreSelect={this.genreHandler}
          />
        </div>
        <div className="col">
          <p className="h4 alert-success mb-0">
            Showing {count} movies in database
          </p>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th style={{ width: "30%" }}>Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th>Rate</th>
                <th>Like</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {movies.map(film => (
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
                        this.deleteHandler(film._id);
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
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPaginate={this.paginationHandler}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
