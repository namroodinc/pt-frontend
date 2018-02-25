import React from "react";
import PropTypes from "prop-types";
import { VictoryContainer, VictoryGroup, VictoryLine } from "victory";

class CirculationsChart extends React.Component {
  render() {
    const { colorScale, data } = this.props;

    return (
      <div>
        <VictoryGroup
          colorScale={colorScale}
          containerComponent={
            <VictoryContainer
              className="myChart"
              style={{
                parent: {
                  backgroundColor: '#FCFCFC'
                }
              }}
            />
          }
          domainPadding={{
            x: [
              0,
              150
            ],
            y: [
              20,
              20
            ]
          }}
          padding={{
            top: 10,
            bottom: 10
          }}
        >
          {data.map((row, i) =>
            <VictoryLine
              data={row}
              key={i}
              interpolation="natural"
              standalone={false}
              style={{
                data: {
                  strokeLinecap: 'round',
                  strokeWidth: 10
                }
              }}
            />
          )}
        </VictoryGroup>
      </div>
    );
  }
}

CirculationsChart.defaultProps = {
  colorScale: [],
  data: []
}

CirculationsChart.propTypes = {
  colorScale: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
};

export default CirculationsChart;
