import React, { Component } from "react";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: {}
  };

  componentDidMount() {
    const initGenre = { _id: 0, name: "All Genres" };
    const genres = [initGenre, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
      selectedGenre: initGenre
    });
  }

  deleteHandler = (id, leng) => {
    if (leng === 1 && this.state.currentPage > 1) {
      const movies = this.state.movies.filter(film => film._id !== id);
      this.setState({ movies, currentPage: this.state.currentPage - 1 });
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
  genreSelectHandler = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  render() {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre
    } = this.state;
    if (this.state.movies.length === 0) {
      return (
        <p className="h4 alert-warning mt-3">There is no record in database!</p>
      );
    }
    const filteredByGenre = selectedGenre._id
      ? allMovies.filter(m => m.genre.name === selectedGenre.name)
      : allMovies;

    //console.log(selectedGenre); //why this line appears twice in console?
    const showList = paginate(filteredByGenre, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.genreSelectHandler}
          />
        </div>
        <div className="col">
          <p className="h4 alert-success mb-0">
            Showing {filteredByGenre.length} movies in database
          </p>
          <MoviesTable
            likeIF={this.toggleLikeHandler}
            deleteIF={this.deleteHandler}
            showList={showList}
          />
          <Pagination
            itemsCount={filteredByGenre.length}
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
