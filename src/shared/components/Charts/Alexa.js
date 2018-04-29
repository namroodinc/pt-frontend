import React from "react";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";
import Marked from "marked";
import moment from "moment";
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
      rankings,
      website
    } = this.props;

    const startDate = moment(rankings[rankings.length - 1].date).format('MMM Do');
    const endDate = moment(rankings[0].date).format('MMM Do');

    const description = Marked(`**${website}** Alexa rankings, _${startDate} - ${endDate}_`);

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
            title={
              <h4>
                {name}
              </h4>
            }
            subheader={ReactHtmlParser(description)}
          />
          <ChartWrapper
            axisFormat={(t) => moment(t).format('MMM Do')}
            domainPaddingX={[
              5,
              5
            ]}
            invertAxis
            scale="time"
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
  rankings: PropTypes.array.isRequired,
  website: PropTypes.string.isRequired
};

export default withStyles(styles)(Alexa);
