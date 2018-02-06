import React from "react";
// import PropTypes from "prop-types";
import { VictoryAxis, VictoryChart, VictoryContainer, VictoryLine } from "victory";

import { LineTheme } from "../../constants/Index";

class Line extends React.Component {
  render() {
    // const { data, title, xAxisDomain, yAxisDomain } = this.props;

    const styles = LineTheme;

    return (
      <div>
        <VictoryChart
          containerComponent={
            <VictoryContainer
              className="myChart"
              height={300}
              width={400}
            />
          }
          style={{
            height: 'auto',
            width: '100%'
          }}
          theme={styles}
        >
          <VictoryAxis
            dependentAxis
            orientation="left"
            standalone={false}
          />
          <VictoryAxis
            standalone={false}
          />
          <VictoryLine
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 5 },
              { x: 4, y: 4 },
              { x: 5, y: 7 }
            ]}
            interpolation="natural"
            standalone={false}
          />
        </VictoryChart>
      </div>
    );
  }
}

// Line.propTypes = {
//   data: PropTypes.array.isRequired,
//   title: PropTypes.string.isRequired,
//   xAxisDomain: PropTypes.object.isRequired,
//   yAxisDomain: PropTypes.object.isRequired
// };

export default Line;
