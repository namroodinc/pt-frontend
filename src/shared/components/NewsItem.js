import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Chip from "@material-ui/core/Chip";

const styles = theme => ({
  chip: {
    margin: '0 8px 8px 0'
  },
});

class NewsItem extends React.Component {
  render() {
    const { classes, title, trends } = this.props;

    return (
      <div
        className="news-item"
      >
        <h2>
          {title}
        </h2>
        {trends.length > 0 &&
          <div
            className="news-item__trends"
          >
            {trends.map((trend, i) =>
              <Chip
                className={classes.chip}
                label={trend}
              />
            )}
          </div>
        }
      </div>
    );
  }
}

NewsItem.defaultProps = {
  title: 'News headline',
  trends: [
    'United Kingdom',
    'Europe',
    'World'
  ]
};

NewsItem.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  trends: PropTypes.array.isRequired
};

export default withStyles(styles)(NewsItem);
