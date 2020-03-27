import React, { Component } from "react";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import Like from "./common/like";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
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
      <table className="table">
        <TableHeader
          columns={this.columns}
          onSort={this.props.onSort}
          sortColumn={this.props.sortColumn}
        />
        <TableBody data={this.props.showList} columns={this.columns} />
      </table>
    );
  }
}

export default MoviesTable;
