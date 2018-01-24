import React from "react";
import PropTypes from "prop-types";

class Table extends React.Component {
  render() {
    const { columns, rows, sortBy } = this.props;

    const rowsIsSorted = !sortBy ? rows : rows.sort((a, b) => {
      if (a[sortBy].type === 'date' && b[sortBy].type === 'date') return new Date(b[sortBy].value) - new Date(a[sortBy].value);
      return b[sortBy].value - a[sortBy].value;
    });
    const rowsMapped = rowsIsSorted.map(row => columns.map(column => typeof row[column.value] === 'object' ? row[column.value].label : row[column.value]));

    return (
      <div
        className="container"
      >
        <table>
          <thead>
            <tr>
              {columns.map((column, i) =>
                <th
                  key={i}
                >
                  {column.label}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rowsMapped.map((row, i) =>
              <tr
                key={i}
              >
                {row.map((cell, i) =>
                  <td
                    key={i}
                  >
                    {cell}
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  sortBy: PropTypes.string
};

export default Table;
