import React from "react";
import PropTypes from "prop-types";
import { assign } from "lodash";
// import wrap from "word-wrap";

import {
  VictoryAxis,
  VictoryChart,
  VictoryContainer,
  VictoryLabel
} from "victory";

import {
  GlobalTheme
} from "../../constants/Index";
// import { Group } from "./Index";

class ChartWrapper extends React.Component {
  render() {
    const {
      axes,
      axisFormat,
      domainPaddingX,
      domainPaddingY,
      height,
      invertAxis,
      padding,
      scale,
      tickCount,
      tickLabels
    } = this.props;

    const {
      theme
    } = GlobalTheme;

    const chartPadding = assign({}, {
      bottom: 20,
      left: 50,
      right: 50,
      top: 5
    }, padding);

    return (
      <div>
        <VictoryChart
          containerComponent={
            <VictoryContainer
              className="myChart"
            />
          }
          domainPadding={{
            x: domainPaddingX,
            y: domainPaddingY
          }}
          height={height}
          padding={chartPadding}
          theme={theme}
        >
          <VictoryAxis
            crossAxis={false}
            offsetY={20}
            scale={{
              x: scale
            }}
            standalone={false}
            tickFormat={axisFormat}
          />
          {(axes === 'both' || axes === 'left') &&
            <VictoryAxis
              crossAxis={false}
              dependentAxis
              invertAxis={invertAxis}
              standalone={false}
              tickCount={tickCount}
              tickValues={tickLabels}
              tickLabelComponent={
                <VictoryLabel />
              }
            />
          }
          {(axes === 'both' || axes === 'right') &&
            <VictoryAxis
              crossAxis={false}
              dependentAxis
              invertAxis={invertAxis}
              offsetX={50}
              orientation="right"
              standalone={false}
              tickCount={tickCount}
              tickValues={tickLabels}
              tickLabelComponent={
                <VictoryLabel />
              }
            />
          }

          {this.props.children}

        </VictoryChart>
      </div>
    );
  }
}

ChartWrapper.defaultProps = {
  axes: 'both',
  axisFormat: (t) => t,
  domainPaddingX: 5,
  domainPaddingY: 20,
  height: 200,
  invertAxis: false,
  padding: {},
  scale: 'linear',
  tickCount: 3,
  tickLabels: []
};

ChartWrapper.propTypes = {
  axes: PropTypes.string,
  axisFormat: PropTypes.func,
  children: PropTypes.node,
  domainPaddingX: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number
  ]),
  domainPaddingY: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number
  ]),
  height: PropTypes.number,
  invertAxis: PropTypes.bool,
  padding: PropTypes.object,
  scale: PropTypes.string,
  tickCount: PropTypes.number,
  tickLabels: PropTypes.array
};

export default ChartWrapper;
