import React from "react";
import PropTypes from "prop-types";
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
    const { axes, domainPaddingX, domainPaddingY, height, invertAxis, scale, tickCount, tickLabels } = this.props;
    const { theme } = GlobalTheme;

    const formatTicks = (tick, index) => {
      console.log(tick, ' ', index + 1);
      if (scale === 'time') {
        return `${Math.round(tick).toLocaleString()}`;
      } else {
        return tickLabels[tickLabels.length - index];
      }
    }

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
          padding={{
            bottom: 20,
            left: 50,
            right: 50,
            top: 5
          }}
          theme={theme}
        >
          <VictoryAxis
            crossAxis={false}
            offsetY={20}
            scale={{
              x: scale
            }}
            standalone={false}
          />
          {(axes === 'both' || axes === 'left') &&
            <VictoryAxis
              crossAxis={false}
              dependentAxis
              invertAxis={invertAxis}
              standalone={false}
              tickCount={tickCount}
              tickFormat={(t, i) => formatTicks(t, i)}
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
              tickFormat={(t, i) => formatTicks(t, i)}
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
  domainPaddingX: 5,
  domainPaddingY: 20,
  height: 200,
  invertAxis: false,
  scale: 'linear',
  tickCount: 3
};

ChartWrapper.propTypes = {
  axes: PropTypes.string,
  children: PropTypes.node,
  domainPaddingX: PropTypes.number,
  domainPaddingY: PropTypes.number,
  height: PropTypes.number,
  invertAxis: PropTypes.bool,
  scale: PropTypes.string,
  tickCount: PropTypes.number
};

export default ChartWrapper;
