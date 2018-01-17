import React from "react";
import { observer } from 'mobx-react';
import PropTypes from "prop-types";
import Card, { CardContent } from "material-ui/Card";
import moment from "moment";
import { VictoryAxis, VictoryChart, VictoryLine } from "victory";
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

    const { articles, circulationHistroy, country, description, name } = Store.retrieveEntry();
    const publicationDescription = description || '';

    const circulationHistroyMapped = circulationHistroy.map(data => {
      return {
        x: new Date(data.year, 1, 1),
        y: data.value
      }
    }).sort((a, b) => a.x - b.x);

    const tickValues = circulationHistroy.map(data => {
      return new Date(data.year, 1, 1)
    }).sort((a, b) => a.x - b.x);

    const firstYear = tickValues[0];
    const lastYear = tickValues[tickValues.length - 1];

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
                  {country}
                </h5>
                {ReactHtmlParser(Marked(publicationDescription))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div
          className="container"
        >

          <VictoryChart>
            <VictoryLine
              domain={{
                x: [
                  firstYear,
                  lastYear
                ]
              }}
              interpolation="natural"
              scale={{
                x: 'time',
                y: 'linear'
              }}
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

            <VictoryAxis
              scale="time"
              standalone={false}
              tickValues={tickValues}
              tickFormat={(x) => {
                if (x.getFullYear() % 1000) {
                  return x.getFullYear();
                } else if (x.getFullYear() % 10) {
                  return x.getFullYear();
                } else {
                  return '';
                }
              }}
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
