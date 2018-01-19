import React from "react";
import { observer } from 'mobx-react';
import PropTypes from "prop-types";
import Card, { CardContent } from "material-ui/Card";
import moment from "moment";
import { VictoryAxis, VictoryLabel, VictoryLine } from "victory";
import ReactHtmlParser from "react-html-parser";
import Marked from "marked";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { Loading, Rating } from "../components/Index";

@observer
class Publication extends React.Component {
  componentWillMount() {
    Actions.updateEntry(this.props.match.params.entryId);
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const { articles, circulationHistroy, description, disambiguation, overallRating, name } = Store.retrieveEntry();
    const publicationDescription = description || '';

    const circulationHistroyMapped = circulationHistroy.map(data => {
      return {
        x: new Date(data.year, 0, 1),
        y: data.value
      }
    }).sort((a, b) => a.x - b.x);

    const firstYear = circulationHistroyMapped[0].x;
    const lastYear = circulationHistroyMapped[circulationHistroyMapped.length - 1].x;

    const maxValue = circulationHistroyMapped.reduce((max, p) => p.y > max ? p.y : max, circulationHistroyMapped[0].y);
    const yAxisDomain = {
      y: [
        0,
        maxValue
      ]
    };

    const styles = {
      axis: {
        axis: {
          stroke: '#000000',
          strokeWidth: 1
        },
        axisLabel: {
          fontFamily: 'inherit',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.002em'
        },
        grid: {
          stroke: '#CACACA',
          strokeDasharray: '2, 7',
          strokeWidth: 0.5
        },
        ticks: {
          size: 4,
          stroke: '#000000',
          strokeWidth: 1
        },
        tickLabels: {
          fill: '#000000',
          fontFamily: "'Inconsolata', monospace",
          fontSize: 7,
          letterSpacing: '0.002em'
        }
      },
      padding: {
        bottom: 50,
        top: 50,
        right: 20,
        left: 70
      },
      parent: {
        boxSizing: "border-box",
        display: "inline",
        padding: 0,
        height: "auto"
      },
      title: {
        fontFamily: 'inherit',
        fontSize: 15,
        fontWeight: 700,
        letterSpacing: '0.002em'
      }
    };

    return (
      <div>
        <div
          className="container"
        >
          <div
            className="publication"
          >
            <Card>
              <CardContent>
                <h5>
                  {disambiguation}
                </h5>
                <h2>
                  {name}
                </h2>
                <Rating
                  rating={overallRating}
                />
                {ReactHtmlParser(Marked(publicationDescription))}
              </CardContent>
            </Card>
          </div>
        </div>

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
              text={`Newspaper Circulation ${firstYear.getFullYear()}-${lastYear.getFullYear()}`}
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
                domain={{
                  x: [
                    firstYear,
                    lastYear
                  ]
                }}
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
                data={circulationHistroyMapped}
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

        </div>

        <div
          className="container"
        >
          <table>
            <thead>
              <tr>
                <th>
                  &nbsp;
                </th>
                <th>
                  Article
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, i) =>
                <tr
                  key={i}
                >
                  <td>
                    <time>
                      {moment(article.publishedAt).format('MMM. DD')}
                    </time>
                  </td>
                  <td>
                    {article.title}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

Publication.propTypes = {
  match: PropTypes.object
};

export default Publication;
