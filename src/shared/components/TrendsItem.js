import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
});

class TrendsItem extends React.Component {
  render() {
    const { count, trend } = this.props;
    const { _id, name, urlToImage } = trend;

    return (
      <div
        className="cube__item"
      >
        <Link
          to={`/trend/${_id}`}
        >
          {urlToImage !== undefined &&
            <img
              src={urlToImage}
            />
          }
          <span
            className="cube__item__description"
          >
            <span
              className="cube__item__description__name"
            >
              {name}
            </span>
            <span
              className="cube__item__description__url"
            >
              Tagged in {count} article(s)
            </span>
          </span>
        </Link>
      </div>
    );
  }
}

TrendsItem.defaultProps = {
  classes: PropTypes.object.isRequired
};

TrendsItem.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  trend: PropTypes.object.isRequired
};

export default withStyles(styles)(TrendsItem);
