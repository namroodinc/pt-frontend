import React from "react";
import PropTypes from "prop-types";

class WordCloud extends React.Component {
  render() {
    return (
      <g>
        {this.props.children}
      </g>
    );
  }
}

WordCloud.propTypes = {
  children: PropTypes.node
};

export default WordCloud;
