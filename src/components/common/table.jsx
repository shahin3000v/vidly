import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

class Table extends Component {
  render() {
    return (
      <table className="table">
        <TableHeader
          columns={this.props.columns}
          onSort={this.props.onSort}
          sortColumn={this.props.sortColumn}
        />
        <TableBody data={this.props.data} columns={this.props.columns} />
      </table>
    );
  }
}

export default Table;
