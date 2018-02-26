import React from "react";
import PropTypes from "prop-types";
import { assign } from "lodash";
import wrap from "word-wrap";
import { VictoryAxis, VictoryChart, VictoryContainer, VictoryLabel } from "victory";

import { Group } from "./Index";
import { GlobalTheme } from "../../constants/Index";

class ChartWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartPadding: GlobalTheme.chartPadding,
      descriptionY: 0,
      legendY: 0
    }
  }

  componentDidMount() {
    const mainBounds = this.headingMain.getBBox();
    const descriptionY = (mainBounds.y + mainBounds.height) + 5;
    const descriptionBounds = this.headingDescription.getBBox();
    const legendY = (descriptionY + descriptionBounds.height) + 5;
    const legendBounds = this.legend.getBBox();
    const chartPaddingTop = (legendY + legendBounds.height) + 10;

    this.setState({
      chartPadding: assign({}, this.state.chartPadding, {
        top: chartPaddingTop
      }),
      descriptionY,
      legendY
    });
  }

  render() {
    const { description, domain, heading, legend } = this.props; // columns,
    const styles = GlobalTheme;

    const headingMain = wrap(heading, {
      width: 48
    });
    const headingDescription = wrap(description, {
      width: 70
    });

    return (
      <div>
        <VictoryChart
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
          domainPadding={{ x: 25 }}
          padding={this.state.chartPadding}
          theme={styles.theme}
        >

          <Group
            inputRef={(headingMain) => this.headingMain = headingMain}
          >
            <VictoryLabel
              x={0}
              y={10}
              style={styles.headings.main}
              text={headingMain}
              verticalAnchor="start"
            />
          </Group>

          <Group
            inputRef={(headingDescription) => this.headingDescription = headingDescription}
          >
            <VictoryLabel
              x={0}
              y={this.state.descriptionY}
              style={styles.headings.description}
              text={headingDescription}
              verticalAnchor="start"
            />
          </Group>

          <Group
            inputRef={(legend) => this.legend = legend}
          >
            {legend !== null &&
              <g>
                {legend.map((icon, i) =>
                  <rect
                    fill={icon.labels.fill}
                    height={6}
                    key={i}
                    width={6}
                    x={0}
                    y={`${this.state.legendY + (i * 10) - 5}`}
                  />
                )}
                {legend.map((text, i) =>
                  <text
                    fill={text.labels.fill}
                    key={i}
                    style={styles.legend}
                    x={0}
                    y={`${this.state.legendY + (i * 10)}`}
                  >
                    <tspan
                      x={10}
                      dy={0}
                      textAnchor="start"
                    >
                      {text.name}
                    </tspan>
                  </text>
                )}
              </g>
            }
          </Group>

          <VictoryAxis
            crossAxis={false}
            dependentAxis
            domain={domain}
            orientation="left"
            standalone={false}
            style={{
              axis: {
                stroke: 0
              }
            }}
          />

          {this.props.children}

          <VictoryAxis
            orientation="top"
            standalone={false}
            style={{
              grid: {
                stroke: 0
              }
            }}
          />

        </VictoryChart>
      </div>
    );
  }
}

// tickFormat={columns !== undefined ? (i) => {
//   return columns[i - 1].labelAdjusted || columns[i - 1].label;
// } : null}

ChartWrapper.defaultProps = {
  description: 'Example description goes here',
  heading: 'Example heading goes here'
};

ChartWrapper.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.array,
  description: PropTypes.string,
  domain: PropTypes.array,
  heading: PropTypes.string,
  legend: PropTypes.array
};

export default ChartWrapper;
