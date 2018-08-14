import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import NewsItem from "./NewsItem";

@observer
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
  articles: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};

export default NewsItems;
