import React from "react";
import ReactHtmlParser from "react-html-parser";
import PropTypes from "prop-types";
import Marked from "marked";

class Banner extends React.Component {
  render() {
    const { description, title } = this.props;
    const bannerDescription = Marked(description) || '';
    const bannerTitle = title || '';

    return (
      <div
        className="banner"
      >
        <div
          className="banner__content"
        >
          <h2>
            {bannerTitle}
          </h2>
        </div>
        <div
          className="banner__content"
        >
          {ReactHtmlParser(bannerDescription)}
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
