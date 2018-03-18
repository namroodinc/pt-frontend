import React from "react";
import PropTypes from "prop-types";

class Flame extends React.Component {
  render() {
    const { color, height, width } = this.props;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 50 50`}
        height={height}
        width={width}
      >
        <path
          fill={color}
          d="M10.437,28.182c0,8.053,6.519,14.566,14.561,14.566c8.047,0,14.565-6.514,14.565-14.566c0-2.232-0.508-4.354-1.412-6.256  l0,0c-2.375-4.906-6.461-7.884-10.143-11.125c-3.672-3.247-0.92-8.053-0.92-8.053c-12.733,9.108-9.24,19.025-8.646,21.973  c-3.624-1.786-3.083-9.056-3.083-9.056c-0.037,0.037-0.079,0.063-0.11,0.1c-3.793,3.425-4.497,9.234-4.497,9.234  C10.495,26.806,10.437,28.182,10.437,28.182z M34.043,33.488c-2.396,4.291-10.695,7.102-16.358,1.658  c2.27-0.508,7.569-2.195,8.973-8.646c0,0,1.186,4.349-1.298,7.274c2.921-1.875,8.578-6.844,2.99-15.931  C31.311,19.326,39.086,24.484,34.043,33.488z"
        />
      </svg>
    )
  }
}

Flame.defaultProps = {
  color: '#F44336',
  height: 62.5,
  width: 50
}

Flame.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};

export default Flame;
