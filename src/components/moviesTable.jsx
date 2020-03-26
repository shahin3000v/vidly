import React from "react";
import Like from "./common/like";

const MoviesTable = props => {
  const { showList, likeMedium, deleteMedium } = props;
  return (
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
};

export default MoviesTable;
