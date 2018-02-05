import React from "react";
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import ArrowDropUp from 'material-ui-icons/ArrowDropUp';
import PropTypes from "prop-types";
import { red, green } from 'material-ui/colors';

class Rating extends React.Component {
  render() {
    const { rating } = this.props;

    const filtered = rating.filter(r => r.ratings.total !== null);

    const currentRating = filtered.length > 0 ? filtered[filtered.length - 1].ratings.total.toFixed(2) : 0;
    let previousRating = 0;
    if (filtered.length > 1) previousRating = filtered[filtered.length - 2].ratings.total.toFixed(2);

    const calculatedRating = (currentRating - previousRating).toFixed(2);

    return currentRating !== 0 ? (
      <span
        className="rating"
      >
        Rated
        <span
          className="rating__metric"
          style={{
            color: currentRating < 50 ? red[500] : green[500]
          }}
        >
          {currentRating}%
        </span>
        {filtered.length > 0 &&
          <span
            className="rating__metric rating__metric--difference"
            style={{
              color: calculatedRating < 0 ? red[500] : green[500]
            }}
          >
            {calculatedRating < 0 ?
              <ArrowDropDown /> : <ArrowDropUp />
            }
            {calculatedRating}%
          </span>
        }
      </span>
    ) : (
      <span
        className="rating"
      >
        Not rated yet.
      </span>
    );
  }
}

Rating.propTypes = {
  rating: PropTypes.object.isRequired
};

export default Rating;
