import React from "react";
import PropTypes from "prop-types";

import { LinkArrow } from "./Icons/Index";

class LinkCard extends React.Component {
  render() {
    const { description, link, title } = this.props;

    return (
      <div
        className="link-card"
      >
        <div
          className="link-card__description"
        >
          <h4>
            {title}
          </h4>
          <span>
            {description}
          </span>
        </div>
        <div
          className="link-card__banner"
        >
          <a
            href={link}
          >
            <span>
              {description}
            </span>
            <span
              className="arrow-link"
            >
              <LinkArrow />
            </span>
          </a>
        </div>
      </div>
    );
  }
}

LinkCard.defaultProps = {
  description: 'This Link Card needs a description',
  llink: '/',
  title: 'This Link Card needs a title'
};

LinkCard.propTypes = {
  description: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.string
};

export default LinkCard;
