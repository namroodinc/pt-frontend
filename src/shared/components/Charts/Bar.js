import React from "react";
import PropTypes from "prop-types";
import { VictoryBar, VictoryGroup, VictoryLabel, VictoryStack } from "victory";

import { ChartWrapper } from "./Index";

class BarChart extends React.Component {
  render() {
    const { axes, data, height, horizontal, invertAxis, isStacked } = this.props;
    const tickLabels = data.map(d => d.x);

    return (
      <div>
        <ChartWrapper
          axes={axes}
          domainPaddingX={30}
          height={height}
          invertAxis={invertAxis}
          tickCount={horizontal ? data.length : 3}
          tickLabels={tickLabels}
        >
          {isStacked ?
            <VictoryStack
              containerComponent={
                <VictoryGroup
                  standalone={false}
                />
              }
              standalone={false}
            >
              <VictoryBar
                data={data}
                horizontal={horizontal}
                standalone={false}
              />
            </VictoryStack> : <VictoryGroup
              standalone={false}
            >
              <VictoryBar
                data={data}
                horizontal={horizontal}
                labelComponent={<VictoryLabel
                  dx={horizontal ? 5 : 0}
                  dy={horizontal ? 0 : 5}
                  textAnchor="start"
                />}
                standalone={false}
              />
            </VictoryGroup>
          }
        </ChartWrapper>
      </div>
    );
  }
}

BarChart.defaultProps = {
  axes: 'both',
  data: [],
  height: 200,
  horizontal: false,
  invertAxis: false,
  isStacked: false
}

BarChart.propTypes = {
  axes: PropTypes.string,
  data: PropTypes.array,
  height: PropTypes.number,
  horizontal: PropTypes.bool,
  invertAxis: PropTypes.bool,
  isStacked: PropTypes.bool
};

export default BarChart;
