import React from "react";
import { Link } from "react-router-dom";
import Avatar from "material-ui/Avatar";
import Card, { CardActions, CardContent } from "material-ui/Card";
import PlayArrow from "material-ui-icons/PlayArrow";
import PropTypes from "prop-types";

import { Time } from "./Index";
import { Rating } from "../Index";

class PublicationListItem extends React.Component {
  render() {
    const { publication } = this.props;
    const { assetUrl, id, name, overallRating, updatedAt } = publication;

    return (
      <Card>

        <CardContent>

          <Time
            dateTime={updatedAt}
            dateTimeFormat="[Last updated:] MMM. DD, HH:mm"
          />

        </CardContent>

        <CardContent>

          <Avatar
            src={assetUrl}
            style={{
              float: 'left',
              height: 40,
              marginBottom: 5,
              marginRight: 15,
              width: 40
            }}
          />

          <h3>
            <Link
              to={`/publication/${id}`}
            >
              {name}
            </Link>
          </h3>

          <Rating
            rating={overallRating}
          />

        </CardContent>

        <CardActions>

          <Link
            to={`/publication/${id}`}
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
    )
  }
}

PublicationListItem.propTypes = {
  publication: PropTypes.object.isRequired
}

export default PublicationListItem;
