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
    currentPage: 1,
    selectedGenre: { _id: -1, name: "All Genres" }
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [this.state.selectedGenre, ...getGenres()]
    });
  }

  deleteHandler = (id, leng, currentPage) => {
    console.log(leng);
    if (leng === 1 && currentPage > 1) {
      const movies = this.state.movies.filter(film => film._id !== id);
      currentPage--;
      this.setState({ movies, currentPage });
    } else {
      const movies = this.state.movies.filter(film => film._id !== id);
      this.setState({ movies });
    }
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
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  render() {
    const { length } = this.state.movies;
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre
    } = this.state;
    if (length === 0) {
      return (
        <p className="h4 alert-warning mt-3">There is no record in database!</p>
      );
    }
    let filteredByGenre = [];
    if (selectedGenre._id === -1) {
      filteredByGenre = allMovies;
    } else {
      filteredByGenre = allMovies.filter(
        m => m.genre._id === selectedGenre._id
      );
    }
    // console.log(selectedGenre);  //why this line appears twice in console?
    const count = filteredByGenre.length;
    const showList = paginate(filteredByGenre, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            currentGenre={this.state.selectedGenre}
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
              {showList.map(showListItem => (
                <tr key={showListItem._id}>
                  <td>{showListItem.title}</td>
                  <td>{showListItem.genre.name}</td>
                  <td>{showListItem.numberInStock}</td>
                  <td>{showListItem.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={showListItem.liked}
                      toggleLike={() => this.toggleLikeHandler(showListItem)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        //2 argument akhar deleteHandler baraye hale bugiye ke vaghti kole
                        //anasore yek safhe gheyr az safhaye avalo pak mikoni ke biad safhaye
                        //ghablesh
                        this.deleteHandler(
                          showListItem._id,
                          showList.length,
                          currentPage
                        );
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
