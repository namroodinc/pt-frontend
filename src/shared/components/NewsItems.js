import React from "react";
import PropTypes from "prop-types";

import NewsItem from "./NewsItem";

class NewsItems extends React.Component {
  render() {
    const { articles } = this.props;

    return (
      <div
        className="news-items"
      >
        {articles.map((article, i) =>
          <NewsItem
            key={i}
            {...article}
          />
        )}
      </div>
    );
  }
}

NewsItems.defaultProps = {
  articles: []
};

NewsItems.propTypes = {
  articles: PropTypes.array.isRequired
};

export default NewsItems;
