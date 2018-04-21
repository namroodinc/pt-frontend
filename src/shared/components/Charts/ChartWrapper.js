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
    const { invertAxis } = this.props;
    const { theme } = GlobalTheme;

    return (
      <div>
        <VictoryChart
          containerComponent={
            <VictoryContainer
              className="myChart"
            />
          }
          domainPadding={{
            x: 5,
            y: 20
          }}
          height={200}
          padding={{
            bottom: 20,
            left: 50,
            right: 50,
            top: 5
          }}
          theme={theme}
        >
          <VictoryAxis
            scale={{
              x: 'linear'
            }}
            standalone={false}
          />
          <VictoryAxis
            crossAxis={false}
            dependentAxis
            invertAxis={invertAxis}
            standalone={false}
            tickCount={3}
            tickFormat={(t) => `${Math.round(t).toLocaleString()}`}
            tickLabelComponent={
              <VictoryLabel />
            }
          />
          <VictoryAxis
            crossAxis={false}
            dependentAxis
            invertAxis={invertAxis}
            offsetX={50}
            orientation="right"
            standalone={false}
            tickCount={3}
            tickFormat={(t) => `${Math.round(t).toLocaleString()}`}
            tickLabelComponent={
              <VictoryLabel />
            }
          />

          {this.props.children}

        </VictoryChart>
      </div>
    );
  }
}

ChartWrapper.defaultProps = {
  invertAxis: false
};

ChartWrapper.propTypes = {
  children: PropTypes.node,
  invertAxis: PropTypes.bool
};

export default ChartWrapper;
