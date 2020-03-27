import React, { Component } from "react";

//props : columns as array, onSort as func , sortColumn as obj
class TableHeader extends Component {
  raiseSort = path => {
    let order = "asc";
    if (this.props.sortColumn.path === path) {
      order = this.props.sortColumn.order === "asc" ? "desc" : "asc";
    }
    this.props.onSort({ path, order });
  };
  renderSortIcon = column => {
    if (this.props.sortColumn.path !== column.path) return null;
    if (this.props.sortColumn.order === "asc")
      return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };
  render() {
    return (
      <thead className="thead-dark">
        <tr>
          {this.props.columns.map(column => (
            <th key={column.label || column.key}>
              <span
                className="clickable"
                onClick={() => this.raiseSort(column.path)}
              >
                {column.label} {this.renderSortIcon(column)}
              </span>
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
