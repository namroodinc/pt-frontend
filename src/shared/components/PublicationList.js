import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import Card, { CardActions, CardContent } from "material-ui/Card";
import PlayArrow from "material-ui-icons/PlayArrow";
import ReactHtmlParser from "react-html-parser";
import Marked from "marked";

import { Rating } from "./Index";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
export default class PublicationList extends React.Component {
  componentWillMount() {
    Actions.updatePublicationList();
  }

  render() {
    const publications = Store.retrievePublicationList();

    return (
      <div
        className="publication-list"
      >
        {publications.map((publication, i) =>
          <Card
            key={i}
          >

            <CardContent>

              <h2>
                <Link
                  to={`/publication/${publication.sys.id}`}
                >
                  {publication.fields.name}
                </Link>
              </h2>

              <Rating
                rating={publication.fields.overallRating}
              />

              {ReactHtmlParser(Marked(publication.fields.description))}

            </CardContent>

            <CardActions>

              <Link
                to={`/publication/${publication.sys.id}`}
              >
                Read more
                <PlayArrow
                  style={{
                    float: 'right'
                  }}
                />
              </Link>

            </CardActions>

          </Card>
        )}
      </div>
    );
  }
}
