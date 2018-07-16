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
    const { authors, classes, description, title, time, trends } = this.props;
    const momentTime = moment(time).fromNow();

    return (
      <div
        className="news-item"
      >
        <h4>
          {title}
        </h4>
        <span
          className="news-item__description"
        >
          {description}
        </span>
        {authors.length > 0 &&
          <div
            className="news-item__authors"
          >
            {authors.map((author, i) =>
              <Chip
                className={classes.chip}
                key={i}
                label={author}
              />
            )}
          </div>
        }
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
  authors: [
    'Leonardo',
    'Donatello',
    'Raphael',
    'Michaelangelo'
  ],
  description: 'A description about the news article.',
  title: 'News headline',
  time: '2018-07-01T00:05:00Z',
  trends: [
    'United Kingdom',
    'Europe',
    'World'
  ]
};

NewsItem.propTypes = {
  authors: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  trends: PropTypes.array.isRequired
};

export default withStyles(styles)(NewsItem);
