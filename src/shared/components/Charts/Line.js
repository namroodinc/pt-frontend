import React from "react";
import PropTypes from "prop-types";
import { VictoryGroup, VictoryLine } from "victory";

import { ChartWrapper } from "./Index";

class LineChart extends React.Component {
  render() {
    // const { data, title, xAxisDomain, yAxisDomain } = this.props;
    const { columns, data } = this.props;

    return (
      <div>
        <ChartWrapper
          columns={columns}
        >
          <VictoryGroup
            colorScale={[
              '#026fc9',
              '#5b9dfd',
              '#004598'
            ]}
          >
            {data.map((row, i) =>
              <VictoryLine
                data={row}
                key={i}
                interpolation="natural"
                standalone={false}
              />
            )}
          </VictoryGroup>
        </ChartWrapper>
      </div>
    );
  }
}

LineChart.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

export default LineChart;
