import React, { Component } from "react";
import Like from "./common/like";

class MoviesTable extends Component {
  raiseSort = path => {
    let order = "asc";
    if (this.props.sortColumn.path === path) {
      order = this.props.sortColumn.order === "asc" ? "desc" : "asc";
    }
    this.props.onSort({ path, order });
  };
  render() {
    const { showList, likeMedium, deleteMedium } = this.props;
    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th
              onClick={() => this.raiseSort("title")}
              style={{ width: "30%" }}
            >
              Title
            </th>
            <th onClick={() => this.raiseSort("genre.name")} scope="col">
              Genre
            </th>
            <th onClick={() => this.raiseSort("numberInStock")} scope="col">
              Stock
            </th>
            <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
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
                  toggleLike={() => likeMedium(showListItem)}
                />
              </td>
              <td>
                <button
                  onClick={() => {
                    deleteMedium(showListItem._id, showList.length);
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
    );
  }
}

export default MoviesTable;
