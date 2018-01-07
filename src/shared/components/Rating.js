import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";

const styles = () => ({
  20: {
    borderColor: '#B71C1C'
  },
  30: {
    borderColor: '#C62828'
  },
  40: {
    borderColor: '#D32F2F'
  },
  50: {
    borderColor: '#E53935'
  },
  60: {
    borderColor: '#1B5E20'
  },
  70: {
    borderColor: '#2E7D32'
  },
  80: {
    borderColor: '#388E3C'
  },
  90: {
    borderColor: '#43A047'
  }
});

class Rating extends React.Component {
  render() {
    const { classes, rating } = this.props;
    let className = '50';
    if (rating < 30) {
      className = '20';
    } else if (rating >= 30 && rating < 40) {
      className = '30';
    } else if (rating >= 40 && rating < 50) {
      className = '40';
    } else if (rating >= 50 && rating < 60) {
      className = '50';
    } else if (rating >= 60 && rating < 70) {
      className = '60';
    } else if (rating >= 70 && rating < 80) {
      className = '70';
    } else if (rating >= 80 && rating < 90) {
      className = '80';
    } else if (rating >= 90) {
      className = '90';
    }
    return (
      <div
        className={classNames('rating', classes[className])}
      >
        {rating}
      </div>
    );
  }
}

Rating.propTypes = {
  classes: PropTypes.object.isRequired,
  rating: PropTypes.number.isRequired
};

export default withStyles(styles, { withTheme: true })(Rating);
