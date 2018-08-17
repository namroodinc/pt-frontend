import React from "react";
import PropTypes from "prop-types";

class TrendItem extends React.Component {
  render() {
    const {
      avatarUrlToImage,
      description,
      prettyName
    } = this.props;

    return (

      <div
        className="trend"
      >

        <div
          className="trend__avatar"
        >
          <div
            className="circle-button circle-button--extra-large"
          >
            {avatarUrlToImage &&
              <img
                src={avatarUrlToImage}
              />
            }
          </div>
        </div>

        <h3>
          {prettyName}
        </h3>

        {description &&
          <h5>
            {description}
          </h5>
        }

      </div>
    );
  }
}

TrendItem.defaultProps = {
  avatarUrlToImage: undefined,
  description: undefined,
  prettyName: 'Trend name'
};

TrendItem.propTypes = {
  avatarUrlToImage: PropTypes.string,
  description: PropTypes.string,
  prettyName: PropTypes.string.isRequired
};

export default TrendItem;
