import React from "react";
import PropTypes from "prop-types";
import { VictoryAxis, VictoryLabel, VictoryLine } from "victory";
import moment from "moment";

import { Table } from "../Data/Index";
import { LineTheme } from "../../constants/Index";

class Line extends React.Component {
  handleOnSelectElement = (event) => {
    console.log(event.clientX);
  }

  render() {
    const { data, title, xAxisDomain, yAxisDomain, tableRowLimit } = this.props;

    const styles = LineTheme;

    const dataColumns = [
      {
        label: 'Year',
        value: 'year'
      },
      {
        label: 'Circulations',
        value: 'circulations'
      }
    ];
    const dataRows = data.map(row => {
      const { x, y } = row;
      return {
        year: {
          label: moment(x).format('YYYY'),
          value: x,
          type: 'date'
        },
        circulations: {
          label: y,
          value: y,
          type: 'number'
        }
      }
    });

    return (
      <div
        className="container"
      >
        <svg
          style={styles.parent}
          viewBox="0 0 450 300"
        >

          <VictoryLabel
            x={10}
            y={15}
            style={styles.title}
            text={title}
            events={{
              onMouseDown: this.handleOnSelectElement
            }}
          />

          <g>

            <VictoryAxis
              axisLabelComponent={<VictoryLabel
                dy={-25}
              />}
              dependentAxis
              domain={yAxisDomain}
              domainPadding={{
                y: 15
              }}
              label="Circulations"
              orientation="left"
              padding={styles.padding}
              standalone={false}
              style={styles.axis}
              tickLabelComponent={<VictoryLabel
                dx={5}
              />}
            />

            <VictoryAxis
              domain={xAxisDomain}
              label="Year"
              padding={styles.padding}
              scale="time"
              standalone={false}
              style={styles.axis}
              tickLabelComponent={<VictoryLabel
                dy={-5}
              />}
            />

            <VictoryLine
              data={data}
              domain={yAxisDomain}
              domainPadding={{
                y: 15
              }}
              interpolation="natural"
              padding={styles.padding}
              style={{
                data: {
                  stroke: '#c43a31'
                },
                parent: {
                  border: '1px solid #ccc'
                }
              }}
              standalone={false}
            />
          </g>

        </svg>

        <div
          className="publication"
        >

          <Table
            columns={dataColumns}
            rows={dataRows}
            sortBy="year"
            rowLimit={tableRowLimit}
          />

        </div>

      </div>
    );
  }
}

Line.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  xAxisDomain: PropTypes.object.isRequired,
  yAxisDomain: PropTypes.object.isRequired,
  tableRowLimit: PropTypes.number
};

export default Line;
