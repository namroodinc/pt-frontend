import React from "react";
import PropTypes from "prop-types";

class RatingBar extends React.Component {
  render() {
    // const { rating } = this.props;

    return (
      <span
        className="rating-bar"
      >
        <span
          className="rating-bar__bar"
        />
        <span
          className="rating-bar__bar"
        />
        <span
          className="rating-bar__bar"
        />
        <span
          className="rating-bar__bar"
        />
      </span>
    );
  }
}

RatingBar.propTypes = {
  rating: PropTypes.number.isRequired
};

export default RatingBar;
