import React from "react";
import PropTypes from "prop-types";
import { VictoryBar, VictoryGroup, VictoryStack } from "victory";

import { ChartWrapper } from "./Index";

class BarChart extends React.Component {
  render() {
    const { data, isStacked } = this.props;

    return (
      <div>
        <ChartWrapper>
          {isStacked ?
            <VictoryStack
              containerComponent={
                <VictoryGroup
                  standalone={false}
                />
              }
              standalone={false}
            >
              {data.map((row, i) =>
                <VictoryBar
                  data={data}
                  key={i}
                  standalone={false}
                />
              )}
            </VictoryStack> : <VictoryGroup
              offset={30}
              standalone={false}
            >
              {data.map((row, i) =>
                <VictoryBar
                  data={data}
                  key={i}
                  standalone={false}
                />
              )}
            </VictoryGroup>
          }
        </ChartWrapper>
      </div>
    );
  }
}

BarChart.defaultProps = {
  domain: null,
  isStacked: false,
  legend: null
}

BarChart.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  description: PropTypes.string,
  domain: PropTypes.array,
  heading: PropTypes.string,
  isStacked: PropTypes.bool,
  legend: PropTypes.array
};

export default BarChart;
