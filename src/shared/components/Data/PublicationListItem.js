import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { LinkArrow } from "../Icons/Index";

class PublicationListItem extends React.Component {
  render() {
    const { data } = this.props;
    const { assetUrl, currentRating, id, name } = data;

    return (
      <div
        className="publication-list__item"
      >
        <div
          className="publication-list__item__banner"
        >
          <Link
            to={`/publication/${id}`}
          >
            <img
              src={assetUrl}
              title={name}
            />
            <span
              className="arrow-link"
            >
              <LinkArrow />
            </span>
          </Link>
        </div>
        <div
          className="publication-list__item__description"
        >
          <h5>
            <Link
              to={`/publication/${id}`}
            >
              {name}
            </Link>
          </h5>
          <span>
            Rated <Link
              to={`/ratings`}
            >
              {currentRating}%
            </Link>
          </span>
        </div>
      </div>
    )
  }
}

PublicationListItem.propTypes = {
  data: PropTypes.object
};

export default PublicationListItem;
