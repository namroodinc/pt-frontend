import React from "react";
import PropTypes from "prop-types";
import { random } from "lodash";
import { VictoryArea } from "victory";

class LineBackgroundChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.getData()
    };
  }

  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData()
      });
    }, 500);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData() {
    const bars = 5;
    return [...Array(bars).keys()].map((bar) => {
      return { x: bar + 1, y: random(2, 10), y0: 0 };
    });
  }

  render() {
    return (
      <div>
        <VictoryArea
          data={this.state.data}
          animate={{
            duration: 500,
            onExit: {
              duration: 500,
              before: () => ({
                _y: 0,
                fill: "orange",
                label: "BYE"
              })
            }
          }}
        />
      </div>
    );
  }
}

LineBackgroundChart.defaultProps = {
  data: [
    [
      { x: 1, y: 2, y0: 0 },
      { x: 2, y: 3, y0: 1 },
      { x: 3, y: 5, y0: 1 },
      { x: 4, y: 4, y0: 2 },
      { x: 5, y: 6, y0: 2 }
    ],
    [
      { x: 1, y: 22, y0: 0 },
      { x: 2, y: 23, y0: 1 },
      { x: 3, y: 35, y0: 1 },
      { x: 4, y: 44, y0: 2 },
      { x: 5, y: 56, y0: 2 }
    ]
  ]
}

LineBackgroundChart.propTypes = {
  data: PropTypes.array
};

export default LineBackgroundChart;
