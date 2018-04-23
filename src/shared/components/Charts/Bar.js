import React from "react";
import PropTypes from "prop-types";
import { VictoryBar, VictoryGroup, VictoryLabel, VictoryStack } from "victory";

import { ChartWrapper } from "./Index";

class BarChart extends React.Component {
  render() {
    const { axes, data, domainPaddingX, height, horizontal, invertAxis, isStacked, padding } = this.props;
    const tickLabels = data.map(d => d.x);

    return (
      <div>
        <ChartWrapper
          axes={axes}
          domainPaddingX={domainPaddingX}
          height={height}
          invertAxis={invertAxis}
          padding={padding}
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
  domainPaddingX: 30,
  domainPaddingY: 20,
  height: 200,
  horizontal: false,
  invertAxis: false,
  isStacked: false,
  padding: {}
}

BarChart.propTypes = {
  axes: PropTypes.string,
  data: PropTypes.array,
  domainPaddingX: PropTypes.number,
  domainPaddingY: PropTypes.number,
  height: PropTypes.number,
  horizontal: PropTypes.bool,
  invertAxis: PropTypes.bool,
  isStacked: PropTypes.bool,
  padding: PropTypes.object
};

export default BarChart;
