import React from "react";
import PropTypes from "prop-types";

class Logo extends React.Component {
  render() {
    const { bgColor, fgColor, size } = this.props;

    const logoBgColor = bgColor || '#000000';
    const logoFgColor = fgColor || '#FFFFFF';
    const logoSize = size || 400;

    return (
      <svg
        width={logoSize}
        height={logoSize}
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <rect
            height="400"
            width="400"
            y="0"
            x="0"
            fill={logoBgColor}
          />
          <path
            transform="rotate(-90 201.37487792968753,140.75001525878906)"
            d="m-58.749693,342.000176l0,-402.500312l520.249129,402.500312l-520.249129,0z"
            fill={logoFgColor}
          />
          <path
            transform="rotate(-90 215.37477111816415,268.24951171875006)"
            d="m81.749717,369.500031l0,-202.501043l267.250119,202.501043l-267.250119,0z"
            fill={logoBgColor}
          />
          <rect
            height="68.999072"
            width="175.99763"
            y="227.499627"
            x="172.50035"
            fill={logoFgColor}
          />
        </g>
      </svg>
    );
  }
}

Logo.propTypes = {
  bgColor: PropTypes.string,
  fgColor: PropTypes.string,
  size: PropTypes.number
};

export default Logo;
