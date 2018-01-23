import React from "react";
import { observer } from 'mobx-react';
import PropTypes from "prop-types";
import Card, { CardContent } from "material-ui/Card";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import Marked from "marked";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { Line } from "../components/Charts/Index";
import { Loading, Rating, RatingBar } from "../components/Index";

@observer
class Publication extends React.Component {
  componentWillMount() {
    Actions.updateEntry(this.props.match.params.entryId);
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const { articles, circulationHistroy, description, disambiguation, overallRating, name } = Store.retrieveEntry();
    const publicationDescription = description || '';

    const historyLength = circulationHistroy.length > 0;

    const historyMapped = circulationHistroy.map(data => {
      return {
        x: new Date(data.year, 0, 31),
        y: data.value
      }
    }).sort((a, b) => a.x - b.x);

    const firstYear = historyLength ? historyMapped[0].x : 0;
    const lastYear = historyLength ? historyMapped[historyMapped.length - 1].x : 0;
    const xAxisDomain = {
      x: [
        firstYear,
        lastYear
      ]
    };

    const maxValue = historyLength ? historyMapped.reduce((max, p) => p.y > max ? p.y : max, historyMapped[0].y) : 0;
    const yAxisDomain = {
      y: [
        0,
        maxValue
      ]
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

        { historyMapped.length > 0 &&
          <Line
            data={historyMapped}
            title={`Newspaper Circulations ${firstYear.getFullYear()}-${lastYear.getFullYear()}`}
            xAxisDomain={xAxisDomain}
            yAxisDomain={yAxisDomain}
          />
        }

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
                <th>
                  Score
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
                  <td>
                    <RatingBar
                      rating={article.sentimentScore.title.score.score}
                    />
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
