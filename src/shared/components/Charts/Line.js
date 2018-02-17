import React from "react";
import PropTypes from "prop-types";
import { VictoryLine } from "victory";

import { ChartWrapper } from "./Index";

class LineChart extends React.Component {
  render() {
    const { columns, data, description, domain, heading, legend } = this.props;

    return (
      <div>
        <ChartWrapper
          columns={columns}
          description={description}
          domain={domain}
          heading={heading}
          legend={legend}
        >
          {data.map((row, i) =>
            <VictoryLine
              data={row}
              key={i}
              interpolation="natural"
              standalone={false}
            />
          )}
        </ChartWrapper>
      </div>
    );
  }
}

LineChart.defaultProps = {
  columns: null,
  domain: null,
  legend: null
}

LineChart.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  description: PropTypes.string,
  domain: PropTypes.array,
  heading: PropTypes.string,
  legend: PropTypes.array
};

export default LineChart;
