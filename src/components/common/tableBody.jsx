import React, { Component } from "react";
import _ from "lodash";

//props: data as array, likeMedium and deleteMeium as func but in columns  array (function in state!)

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  render() {
    return (
      <tbody>
        {this.props.data.map(item => (
          <tr key={item._id}>
            {this.props.columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
