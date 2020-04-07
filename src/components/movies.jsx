import React, { Component } from "react";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: { _id: 0, name: "All Genres" },
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  componentDidMount() {
    const genres = [{ _id: 0, name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
    });
  }

  deleteHandler = (id, leng) => {
    if (leng === 1 && this.state.currentPage > 1) {
      const movies = this.state.movies.filter((film) => film._id !== id);
      this.setState({ movies, currentPage: this.state.currentPage - 1 });
    } else {
      const movies = this.state.movies.filter((film) => film._id !== id);
      this.setState({ movies });
    }
  };
  toggleLikeHandler = (film) => {
    let movies = this.state.movies;
    movies = movies.map((movie) => {
      if (movie === film) movie.liked = !movie.liked;
      return movie;
    });
    this.setState({ movies });
  };
  paginationHandler = (page) => {
    this.setState({ currentPage: page });
  };
  genreSelectHandler = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };
  sortHandler = (sortColumn) => {
    // let order = "asc";
    // if (this.state.sortColumn.path === path) {
    //   order = this.state.sortColumn.order === "asc" ? "desc" : "asc";
    // }
    this.setState({ sortColumn, currentPage: 1 });
  };
  searchHandler = (query) => {
    //
    const searchQuery = query;
    const selectedGenre = { _id: 0, name: "All Genres" };
    this.setState({ selectedGenre, searchQuery, currentPage: 1 });
  };
  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title
          .toString()
          .toLowerCase()
          .startsWith(searchQuery.toString().toLowerCase())
      );
    } else {
      filtered = selectedGenre._id
        ? allMovies.filter((m) => m.genre.name === selectedGenre.name)
        : allMovies;
    }
    const count = filtered.length;
    const sortedList = _.orderBy(
      filtered,
      [sortColumn.path],
      [sortColumn.order]
    );
    const showList = paginate(sortedList, currentPage, pageSize);
    return { showList, count };
  };

  render() {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      sortColumn,
      selectedGenre,
    } = this.state;

    if (allMovies.length === 0) {
      return (
        <p className="h4 alert-warning mt-3">There is no record in database!</p>
      );
    }

    const { showList, count } = this.getPagedData();

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
          <Link to="/movies/new" className="btn btn-primary my-1">
            New Movie
          </Link>
          <p className="h4 alert-success mb-0">
            Showing {count} movies in database ({selectedGenre.name} )
          </p>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.searchHandler}
          />
          <MoviesTable
            likeMedium={this.toggleLikeHandler}
            deleteMedium={this.deleteHandler}
            onSort={this.sortHandler}
            showList={showList}
            sortColumn={sortColumn}
          />
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
