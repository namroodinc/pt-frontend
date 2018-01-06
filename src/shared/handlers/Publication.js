import React from "react";
import { observer } from 'mobx-react';
import PropTypes from "prop-types";
import Card, { CardContent } from "material-ui/Card";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import Marked from "marked";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
class Publication extends React.Component {
  componentWillMount() {
    Actions.updateEntry(this.props.match.params.entryId);
  }

  render() {
    const { articles, country, description, name } = Store.retrieveEntry();
    const publicationDescription = description || '';

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

      </div>
    )
  }
}

Publication.propTypes = {
  match: PropTypes.object
};

export default Publication;
