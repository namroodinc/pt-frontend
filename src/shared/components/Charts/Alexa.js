import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { VictoryAxis, VictoryChart, VictoryContainer, VictoryLine } from "victory";

const styles = theme => ({
});

class Alexa extends React.Component {
  render() {
    const { name, rankings } = this.props;

    console.log(rankings);

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
          >
            <VictoryLine
              data={rankings}
              interpolation="natural"
              x="date"
              y={(d) => d.value}
            />
            <VictoryAxis
              dependentAxis
              invertAxis
              standalone={false}
            />
            <VictoryAxis
              standalone={false}
            />
          </VictoryChart>
        </div>
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
