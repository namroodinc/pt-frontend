import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import {
  VictoryAxis,
  VictoryChart,
  VictoryContainer,
  VictoryLabel,
  VictoryLine
} from "victory";

import {
  GlobalTheme
} from "../../constants/Index";

const styles = theme => ({
});

class Alexa extends React.Component {
  render() {
    const { name, rankings } = this.props;
    const { theme } = GlobalTheme;

    // console.log(rankings);

    return (
      <div>
        <h2>
          {name}
        </h2>
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
                x: 'time'
              }}
              standalone={false}
              style={{
                grid: {
                  stroke: 'transparent',
                  strokeWidth: 0
                }
              }}
            />
            <VictoryAxis
              dependentAxis
              invertAxis
              standalone={false}
              tickCount={3}
              tickFormat={(t) => `${Math.round(t).toLocaleString()}`}
              tickLabelComponent={
                <VictoryLabel />
              }
            />
            <VictoryAxis
              dependentAxis
              invertAxis
              offsetX={50}
              orientation="right"
              standalone={false}
              tickCount={3}
              tickFormat={(t) => `${Math.round(t).toLocaleString()}`}
              tickLabelComponent={
                <VictoryLabel />
              }
            />
            <VictoryLine
              data={rankings}
              interpolation="natural"
              x="date"
              y={(d) => d.value}
            />
          </VictoryChart>
        </div>
        <hr />
      </div>
    );
  }
}

Alexa.defaultProps = {
  name: 'Publication name missing',
  rankings: []
};

Alexa.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rankings: PropTypes.array.isRequired
};

export default withStyles(styles)(Alexa);
