import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import Avatar from "material-ui/Avatar";
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
    const assets = Store.retrieveAssetsList();
    const publications = Store.retrievePublicationList();

    const publicationList = publications.map((publication, i) => {
      const { avatar, title } = publication.fields;
      const { id } = publication.sys;
      const { description, name, overallRating } = publication.fields;
      const assetIdIndex = assets.find(asset => asset.sys.id === avatar.sys.id);

      return {
        assetUrl: assetIdIndex.fields.file.url,
        description,
        id,
        name,
        overallRating,
        title
      }
    });

    return (
      <div
        className="publication-list"
      >
        {publicationList.map((publication, i) =>
          <Card
            key={i}
          >

            <CardContent>

              <Avatar
                src={publication.assetUrl}
                style={{
                  float: 'left',
                  height: 60,
                  marginBottom: 5,
                  marginRight: 15,
                  marginTop: -5,
                  width: 60
                }}
              />

              <h2>
                <Link
                  to={`/publication/${publication.id}`}
                >
                  {publication.name}
                </Link>
              </h2>

              <Rating
                rating={publication.overallRating}
              />

              {ReactHtmlParser(Marked(publication.description))}

            </CardContent>

            <CardActions>

              <Link
                to={`/publication/${publication.id}`}
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
