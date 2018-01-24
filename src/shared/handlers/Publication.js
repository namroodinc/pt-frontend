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
import { Table } from "../components/Data/Index";
import { New } from "../components/Icons/Index";
import { Loading, Rating } from "../components/Index";

@observer
class Publication extends React.Component {
  componentWillMount() {
    Actions.getEntry(this.props.match.params.entryId);
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const { articles, circulationHistroy, description, disambiguation, overallRating, name } = Store.retrieveEntry();

    const articleColumns = [
      {
        label: '',
        value: 'date'
      },
      {
        label: 'Article',
        value: 'article'
      }
    ];
    const articleRows = articles.map(article => {
      const { publishedAt, title } = article;

      const date = moment(publishedAt).format('MM/DD/YYYY');
      const dateToday = moment().format('MM/DD/YYYY');

      return {
        date: {
          label: (
            <time>
              {date === dateToday &&
                <New />
              }
              {moment(publishedAt).format('MMM. DD')}
            </time>
          ),
          value: publishedAt,
          type: 'date'
        },
        article: title
      }
    });

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
            tableRowLimit={10}
          />
        }

        <Table
          columns={articleColumns}
          rows={articleRows}
          sortBy="date"
          rowLimit={20}
        />

      </div>
    )
  }
}

Publication.propTypes = {
  match: PropTypes.object
};

export default Publication;
