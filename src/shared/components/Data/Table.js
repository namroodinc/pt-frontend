import React from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedLimit: false
    }
  }

  handleOnLoadMore = () => {
    this.setState({
      expandedLimit: !this.state.expandedLimit
    });
  }

  render() {
    const { columns, notes, rows, rowLimit, sortBy } = this.props;

    const rowsIsSorted = !sortBy ? rows : rows.sort((a, b) => {
      if (a[sortBy].type === 'date' && b[sortBy].type === 'date') {
        return new Date(b[sortBy].value) - new Date(a[sortBy].value);
      }
      return b[sortBy].value - a[sortBy].value;
    });

    console.log(rowsIsSorted);

    const rowsMapped = rowsIsSorted.map(row => {
      return columns.map(column => typeof row[column.value] === 'object' ? row[column.value].value : row[column.value]);
    });

    console.log(rowsMapped);

    const numberOfRows = this.state.expandedLimit ? rowsMapped : rowsMapped.slice(0, rowLimit);

    return (
      <div
        className="table"
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
            {numberOfRows.map((row, i) =>
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

        {rowLimit <= rowsMapped.length &&
          <div
            className="table__controls"
          >
            <Button
              color="primary"
              onClick={this.handleOnLoadMore}
              raised
            >
              {this.state.expandedLimit ?
                <span>
                  Hide More
                </span> : <span>
                  Show More
                </span>
              }
            </Button>
          </div>
        }

        {notes.length > 0 &&
          <div
            className="table__notes"
          >
            {notes.map((note, i) =>
              <div
                className="table__notes__note"
                key={i}
              >
                {note}
              </div>
            )}
          </div>
        }

      </div>
    );
  }
}

Table.defaultProps = {
  notes: []
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  notes: PropTypes.array,
  rows: PropTypes.array.isRequired,
  rowLimit: PropTypes.number,
  sortBy: PropTypes.string
};

export default Table;
