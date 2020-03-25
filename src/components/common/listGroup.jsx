import React from "react";

const ListGroup = props => {
  let { items, onGenreSelect } = props;
  items = [{ _id: -1, name: "All Genres" }, ...items];
  return (
    <div className="list-group">
      {items.map(item => (
        <button
          key={item._id}
          onClick={() => onGenreSelect(item)}
          className="list-group-item list-group-item-action"
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default ListGroup;
