import React from "react";
import PropTypes from "prop-types";

class New extends React.Component {
  render() {
    const { color, height, style, width } = this.props;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        height={height}
        style={style}
        width={width}
      >
        <circle
          fill={color}
          cx="50"
          cy="50"
          r="38.16"
        />
      </svg>
    )
  }
}

New.defaultProps = {
  color: '#026FC9',
  height: 10,
  width: 10
}

New.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.object,
  width: PropTypes.number
};

export default New;
