import React from "react";
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import ArrowDropUp from 'material-ui-icons/ArrowDropUp';
import PropTypes from "prop-types";
import { red, green } from 'material-ui/colors';

class Rating extends React.Component {
  render() {
    const { rating } = this.props;

    const filterRatings = rating.filter(r => r.ratings.total !== null);
    const moreThanOneRating = filterRatings.length > 0;

    const currentRating = moreThanOneRating ? filterRatings[filterRatings.length - 1].ratings.total.toFixed(2) : 0;
    let previousRating = moreThanOneRating ? filterRatings[filterRatings.length - 2].ratings.total.toFixed(2) : 0;
    const calculatedRating = (currentRating - previousRating).toFixed(2);

    return (
      <span
        className="rating"
      >
        Rating:
        <span
          className="rating__metric"
          style={{
            color: currentRating < 50 ? red[500] : green[500]
          }}
        >
          {currentRating}%
        </span>
        {moreThanOneRating &&
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
    );
  }
}

Rating.propTypes = {
  rating: PropTypes.object.isRequired
};

export default Rating;
