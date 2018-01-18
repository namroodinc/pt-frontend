import React from "react";
import { observer } from 'mobx-react';
import PropTypes from "prop-types";
import Card, { CardContent } from "material-ui/Card";
import moment from "moment";
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine } from "victory";
import ReactHtmlParser from "react-html-parser";
import Marked from "marked";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { Loading } from "../components/Index";

@observer
class Publication extends React.Component {
  componentWillMount() {
    Actions.updateEntry(this.props.match.params.entryId);
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const { articles, circulationHistroy, description, disambiguation, name } = Store.retrieveEntry();
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

    const styles = {
      axis: {
        axis: {
          stroke: '#000000',
          strokeWidth: 1
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
          fontSize: 8,
          letterSpacing: '0.002em'
        }
      },
      title: {
        fontFamily: 'inherit',
        fontSize: 15,
        fontWeight: 700,
        letterSpacing: '0.002em'
      }
    }

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
                <h2>
                  {name}
                </h2>
                <h5>
                  {disambiguation}
                </h5>
                {ReactHtmlParser(Marked(publicationDescription))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div
          className="container"
        >

          <VictoryChart
            domainPadding={{
              y: 15
            }}
            height={300}
            width={450}
          >

            <VictoryLabel
              x={0}
              y={25}
              style={styles.title}
              text={`Newspaper Circulation ${firstYear.getFullYear()}-${lastYear.getFullYear()}`}
            />

            <VictoryAxis
              scale="time"
              standalone={false}
              style={styles.axis}
              tickLabelComponent={<VictoryLabel
                dy={-5}
              />}
            />

            <VictoryAxis
              dependentAxis
              orientation="left"
              standalone={false}
              style={styles.axis}
              tickLabelComponent={<VictoryLabel
                dx={5}
              />}
            />

            <VictoryLine
              domain={{
                x: [
                  firstYear,
                  lastYear
                ],
                y: [
                  0,
                  maxValue
                ]
              }}
              interpolation="natural"
              style={{
                data: {
                  stroke: '#c43a31'
                },
                parent: {
                  border: '1px solid #ccc'
                }
              }}
              data={circulationHistroyMapped}
            />
          </VictoryChart>

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
