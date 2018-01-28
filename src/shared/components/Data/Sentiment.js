import React from "react";
import PropTypes from "prop-types";

class Sentiment extends React.Component {
  render() {
    const { score } = this.props;

    return (score < -2) ? (
      <div>
        {score}
      </div>
    ) : null;
  }
}

Sentiment.propTypes = {
  score: PropTypes.number.isRequired
};

export default Sentiment;
