import React from "react";
import PropTypes from "prop-types";
import { VictoryAxis, VictoryContainer, VictoryChart, VictoryGroup, VictoryLabel, VictoryLine } from "victory";

import { GlobalTheme } from "../../constants/Index";

class CirculationsChart extends React.Component {
  render() {
    const { colorScale, data } = this.props;

    const { groupLabels, theme } = GlobalTheme;

    return (
      <div>
        <VictoryChart
          containerComponent={
            <VictoryContainer
              className="myChart"
            />
          }
          domainPadding={{
            x: [
              0,
              270
            ],
            y: [
              30,
              30
            ]
          }}
          padding={{
            top: 10,
            bottom: 10
          }}
          theme={theme}
        >
          <VictoryAxis
            crossAxis={false}
            dependentAxis
            offsetX={70}
            orientation="right"
            standalone={false}
          />
          <VictoryAxis
            offsetY={40}
            orientation="top"
            scale={{
              x: 'time'
            }}
            standalone={false}
            style={{
              grid: {
                stroke: 0
              }
            }}
          />
          <VictoryGroup
            colorScale={colorScale}
            labelComponent={<VictoryLabel
              dx={5}
              style={groupLabels}
              textAnchor="start"
              verticalAnchor="middle"
            />}
            standalone={false}
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
                    strokeWidth: 5
                  }
                }}
              />
            )}
          </VictoryGroup>
        </VictoryChart>
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
