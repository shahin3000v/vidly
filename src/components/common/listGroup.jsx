import React from "react";

const ListGroup = props => {
  const { items, selectedItem, txtProp, vluProp, onItemSelect } = props;
  return (
    <div className="list-group">
      {items.map(item => (
        <button
          key={item[txtProp]}
          onClick={() => onItemSelect(item)}
          className={
            selectedItem[vluProp] === item[vluProp]
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

ListGroup.defaultProps = {
  txtProp: "name",
  vluProp: "_id"
};

export default ListGroup;
