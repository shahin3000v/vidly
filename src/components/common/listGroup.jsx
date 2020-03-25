import React from "react";

const ListGroup = props => {
  const { items, currentGenre, txtProp, vluProp, onGenreSelect } = props;
  return (
    <div className="list-group">
      {items.map(item => (
        <button
          key={item[txtProp]}
          onClick={() => onGenreSelect(item)}
          className={
            currentGenre[vluProp] === item[vluProp]
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
        >
          {item[txtProp]}
        </button>
      ))}
    </div>
  );
};

export default ListGroup;
