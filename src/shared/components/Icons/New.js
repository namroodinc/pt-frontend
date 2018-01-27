import React from "react";
import PropTypes from "prop-types";

class New extends React.Component {
  render() {
    const { color, style, width } = this.props;

    const setColor = color || '#026FC9';
    const setWidth = width || 10;
    const setHeight = setWidth;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        height={setHeight}
        style={style}
        width={setWidth}
      >
        <circle
          fill={setColor}
          cx="50"
          cy="50"
          r="38.16"
        />
      </svg>
    )
  }
}

New.propTypes = {
  color: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.number
};

export default New;
