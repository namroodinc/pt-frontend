import React from "react";

import { Bar } from "../Charts/Index";

class PressComplaint extends React.Component {
  render() {
    const { data } = this.props;

    const columns = [
      {
        label: 'Total'
      },
      {
        label: 'Upheld'
      },
      {
        label: 'Resolved'
      },
      {
        label: 'Sufficient Remedial Action'
      },
      {
        label: 'Not Upheld'
      },
      {
        label: 'No finding'
      }
    ];

    const rows = data.map((row, i) => {
      return columns.map((col, j) => {
        return {
          x: col.label,
          y: row[col.label]
        }
      });
    });

    return (
      <div>
        <Bar
          columns={columns}
          data={rows}
        />
      </div>
    );
  }
}

export default PressComplaint;
