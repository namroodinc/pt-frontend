import React from "react";
import { Link } from "react-router-dom";

class PublicationListItem extends React.Component {
  render() {
    const { data } = this.props;
    const { assetUrl, id, name } = data;

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
          </Link>
        </div>
        <div
          className="publication-list__item__content"
        >
          {name}
        </div>
      </div>
    )
  }
}

export default PublicationListItem;
