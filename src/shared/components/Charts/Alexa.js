import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Avatar } from "material-ui";
import Card, { CardHeader } from "material-ui/Card";
import {
  VictoryLine
} from "victory";

import {
  ChartWrapper
} from "./Index";

const styles = theme => ({
  cardHeader: {
    paddingLeft: 10,
    paddingRight: 10
  }
});

class Alexa extends React.Component {
  render() {
    const {
      assetUrl,
      classes,
      fill,
      name,
      rankings
    } = this.props;

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
          <ChartWrapper
            invertAxis
          >
            <VictoryLine
              data={rankings}
              style={{
                data: {
                  stroke: fill
                }
              }}
              x="date"
              y={(d) => d.value}
            />
          </ChartWrapper>
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
