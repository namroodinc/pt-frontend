import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";

import Chip from "@material-ui/core/Chip";

const styles = theme => ({
  chip: {
    margin: '0 8px 8px 0'
  }
});

class NewsItem extends React.Component {
  render() {
    const { classes, title, time, trends } = this.props;
    const momentTime = moment(time).fromNow();

    return (
      <div
        className="news-item"
      >
        <h2>
          {title}
        </h2>
        <div
          className="news-item__footer"
        >
          <div
            className="news-item__footer__time"
          >
            <span>
              {momentTime}
            </span>
          </div>
          {trends.length > 0 &&
            <div
              className="news-item__footer__trends"
            >
              {trends.map((trend, i) =>
                <Chip
                  className={classes.chip}
                  key={i}
                  label={trend}
                />
              )}
            </div>
          }
        </div>
      </div>
    );
  }
}

NewsItem.defaultProps = {
  title: 'News headline',
  time: '2018-07-01T00:05:00Z',
  trends: [
    'United Kingdom',
    'Europe',
    'World'
  ]
};

NewsItem.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  trends: PropTypes.array.isRequired
};

export default withStyles(styles)(NewsItem);
