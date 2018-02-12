import React from "react";
import { VictoryBar, VictoryGroup } from "victory";

import { ChartWrapper } from "./Index";

export default class BarChart extends React.Component {
  render() {
    // const { data, title, xAxisDomain, yAxisDomain } = this.props;
    const { columns, data } = this.props;

    return (
      <div>
        <ChartWrapper
          columns={columns}
        >
          <VictoryGroup
            colorScale={[
              '#D1D3D4',
              '#F0F0F0',
              '#3C3B3B'
            ]}
            offset={25}
          >
            {data.map((row, i) =>
              <VictoryBar
                data={row}
                key={i}
                standalone={false}
              />
            )}
          </VictoryGroup>
        </ChartWrapper>
      </div>
    );
  }
}
