import React from "react";
// import PropTypes from "prop-types";
import { VictoryChart, VictoryContainer, VictoryLine } from "victory";

import { LineTheme } from "../../constants/Index";

class Line extends React.Component {
  render() {
    // const { data, title, xAxisDomain, yAxisDomain } = this.props;

    const styles = LineTheme;

    return (
      <VictoryChart
        containerComponent={<VictoryContainer height={300} width={400} />}
        theme={styles}
      >
        <VictoryLine
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 7 }
          ]}
        />
      </VictoryChart>
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
