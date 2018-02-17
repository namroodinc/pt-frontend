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
      descriptionY: 0
    }
  }

  componentDidMount() {
    const mainBounds = this.headingMain.getBBox();
    const descriptionY = (mainBounds.y + mainBounds.height) + 5;

    const descriptionBounds = this.headingDescription.getBBox();
    const chartPaddingTop = (descriptionY + descriptionBounds.height) + 5;

    this.setState({
      chartPadding: assign({}, this.state.chartPadding, {
        top: chartPaddingTop
      }),
      descriptionY
    })
  }

  render() {
    const { columns } = this.props;
    const styles = GlobalTheme;

    const headingMain = wrap('Example heading goes here', {
      width: 32
    });

    const headingDescription = wrap('Example description goes here', {
      width: 55
    });

    return (
      <div>
        <VictoryChart
          containerComponent={
            <VictoryContainer
              className="myChart"
            />
          }
          padding={this.state.chartPadding}
          style={{
            parent: {
              backgroundColor: '#F0F0F0'
            }
          }}
          theme={styles.theme}
        >

          <Group
            inputRef={(headingMain) => this.headingMain = headingMain}
          >
            <VictoryLabel
              x={30}
              y={20}
              style={styles.headings.main}
              text={headingMain}
              verticalAnchor="start"
            />
          </Group>

          <Group
            inputRef={(headingDescription) => this.headingDescription = headingDescription}
          >
            <VictoryLabel
              x={30}
              y={this.state.descriptionY}
              style={styles.headings.description}
              text={headingDescription}
              verticalAnchor="start"
            />
          </Group>

          <VictoryAxis
            crossAxis={false}
            dependentAxis
            orientation="left"
            standalone={false}
          />

          {this.props.children}

          <VictoryAxis
            standalone={false}
            tickFormat={(i) => columns[i - 1].label}
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

ChartWrapper.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.array
};

export default ChartWrapper;
