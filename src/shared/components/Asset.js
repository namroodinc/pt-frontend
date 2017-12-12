import React from "react";
import PropTypes from "prop-types";

class Asset extends React.Component {
  render() {
    const { assetUrl, entryId, title } = this.props;

    return (
      <div
        className="asset"
      >
        <div
          className="asset__media"
        >
          {entryId &&
            <a
              href={`/portfolio/${entryId}`}
            >
              <img
                className="asset__media__image"
                src={assetUrl}
                title={title}
              />
            </a>
          }
          {!entryId &&
            <img
              className="asset__media__image"
              src={assetUrl}
              title={title}
            />
          }
        </div>
      </div>
    );
  }
}

Asset.propTypes = {
  assetUrl: PropTypes.string,
  entryId: PropTypes.string,
  title: PropTypes.string
};

export default Asset;
