import React from "react";
import PropTypes from "prop-types";

class Banner extends React.Component {
  render() {
    const { description, title } = this.props;
    const bannerDescription = description || 'Banner Description missing.'; //TODO: Need a markdown-to-html function/method
    const bannerTitle = title || 'Banner Title missing.';

    return (
      <div
        className="banner"
      >
        <div
          className="banner__content"
        >
          <h1>
            {bannerTitle}
          </h1>
        </div>
        <div
          className="banner__content"
        >
          <p>
            {bannerDescription}
          </p>
        </div>
      </div>
    );
  }
}

Banner.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string
};

export default Banner;
