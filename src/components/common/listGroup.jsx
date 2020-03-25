import React from "react";

const ListGroup = props => {
  const { items, currentGenre, onGenreSelect } = props;
  console.log(currentGenre);
  return (
    <div className="list-group">
      {items.map(item => (
        <button
          key={item._id}
          onClick={() => onGenreSelect(item)}
          className={
            currentGenre._id === item._id
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default ListGroup;
