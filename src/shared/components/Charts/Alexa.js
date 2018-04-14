import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Avatar } from "material-ui";
import Card, { CardHeader } from "material-ui/Card";
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
  cardHeader: {
    paddingLeft: 10,
    paddingRight: 10
  }
});

class Alexa extends React.Component {
  render() {
    const { assetUrl, classes, fill, name, rankings } = this.props;
    const { theme } = GlobalTheme;

    // console.log(rankings);

    return (
      <div>
        <Card>
          <CardHeader
            avatar={
              <Avatar
                aria-label={name}
                alt={name}
                src={assetUrl}
              />
            }
            className={classes.cardHeader}
            title={name}
            subheader="September 14, 2016"
          />
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
              style={{
                data: {
                  stroke: fill
                }
              }}
              x="date"
              y={(d) => d.value}
            />
          </VictoryChart>
        </Card>
      </div>
    );
  }
}

Alexa.defaultProps = {
  fill: '#000',
  name: 'Publication name missing',
  rankings: []
};

Alexa.propTypes = {
  assetUrl: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  fill: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rankings: PropTypes.array.isRequired
};

export default withStyles(styles)(Alexa);
