import React from "react";
import PropTypes from "prop-types";

import { Bar } from "../Charts/Index";

import Store from "../../stores/Store";

class PressComplaint extends React.Component {
  render() {
    const { data } = this.props;
    const name = Store.getPublicationName;

    const columns = [
      {
        label: 'Total',
        labelAdjusted: 'Total\nComplaints'
      },
      {
        label: 'Upheld'
      },
      {
        label: 'Resolved'
      },
      {
        label: 'Sufficient Remedial Action',
        labelAdjusted: 'Sufficient\nRemedial Action'
      },
      {
        label: 'Not Upheld'
      },
      {
        label: 'No finding'
      }
    ];

    const colorScale = {
      pcc: '#5b9dfd',
      ipso: '#026fc9'
    }

    const legend = [
      {
        name: 'Press Complaints Commission (PCC) - 06/1990 to 09/2014',
        labels: {
          fill: colorScale['pcc']
        }
      },
      {
        name: 'Independent Press Standards Organisation (IPSO) - 09/2014 to present',
        labels: {
          fill: colorScale['ipso']
        }
      }
    ];

    const rows = data.map((row, i) => {
      return columns.map((col, j) => {
        return {
          x: col.label,
          y: row.data[col.label],
          labelAdjusted: col.labelAdjusted || col.label,
          fill: colorScale[row.source]
        }
      });
    });

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const domain = [].concat(...rows).filter(data => data.x === 'Total').map(data => data.y);
    const domainMax = Math.round(domain.reduce(reducer) / 100) * 100;

    return (
      <div>
        <Bar
          columns={columns}
          data={rows}
          description={``}
          domain={[
            0,
            domainMax
          ]}
          heading={`Press Complaints against ${name}`}
          isStacked
          legend={legend}
        />
      </div>
    );
  }
}

PressComplaint.propTypes = {
  data: PropTypes.array
};

export default PressComplaint;
