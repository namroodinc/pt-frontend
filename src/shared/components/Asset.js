import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Asset extends React.Component {
  render() {
    const { asset, id, title } = this.props;

    return (
      <div
        className="asset"
      >
        <div
          className="asset__media"
        >
          {id &&
            <Link
              to={`/publication/${id}`}
            >
              <img
                className="asset__media__image"
                src={asset}
                title={title}
              />
            </Link>
          }
          {!id &&
            <img
              className="asset__media__image"
              src={asset}
              title={title}
            />
          }
        </div>
      </div>
    );
  }
}

Asset.propTypes = {
  asset: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string
};

export default Asset;
