import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like
          liked={movie.liked}
          toggleLike={() => this.props.likeMedium(movie)}
        />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => {
            this.props.deleteMedium(movie._id, this.props.showList.length);
          }}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];
  render() {
    return (
      <Table
        data={this.props.showList}
        columns={this.columns}
        onSort={this.props.onSort}
        sortColumn={this.props.sortColumn}
      />
    );
  }
}

export default MoviesTable;
