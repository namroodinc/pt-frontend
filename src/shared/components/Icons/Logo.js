import React from 'react';

export default class Logo extends React.Component {
  render() {
    const { colorAccent, colorCircle, size } = this.props;

    return(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={size}
        width={size}
        viewBox={`0 0 300 300`}
      >
        <defs>
          <clipPath
            id="logo-clip-path"
          >
            <circle
              cx="150"
              cy="150"
              r="148"
            />
          </clipPath>
        </defs>
        <circle
          fill={colorCircle}
          cx="150"
          cy="150"
          r="148"
        />
        <g
          className="logo-clip-path"
        >
          <path
            fill={colorAccent}
            d="M168.28,115.53,243.82,316l-48.77,72.58H104.95L56.18,316l75.55-200.48h36.55m6.92-10H124.81L45,317.31l54.62,81.27H200.39L255,317.3,175.19,105.53Z"
          />
          <path
            fill={colorAccent}
            d="M150,48.2a15.2,15.2,0,1,1-15.2,15.2A15.22,15.22,0,0,1,150,48.2m0-10a25.2,25.2,0,1,0,25.2,25.2A25.2,25.2,0,0,0,150,38.2Z"
          />
          <line
            stroke={colorAccent}
            strokeMiterlimit={10}
            strokeWidth={10}
            x1="143.7"
            y1="110.44"
            x2="114.3"
            y2="316.68"
          />
          <line
            stroke={colorAccent}
            strokeMiterlimit={10}
            strokeWidth={10}
            x1="156.3"
            y1="110.44"
            x2="185.7"
            y2="316.68"
          />
        </g>
      </svg>
    );
  }
}

Logo.defaultProps = {
  colorAccent: '#880E4F',
  colorCircle: '#FCE4EC',
  size: 50
};
