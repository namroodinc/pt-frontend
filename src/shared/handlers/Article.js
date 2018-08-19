import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import { Loading, NewsItem, TypeItem } from "../components/Index";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
class Article extends React.Component {
  componentDidMount() {
    Actions.getArticle(this.props.match.params.articleId);
  }

  componentWillUnmount() {
    Store.reset();
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const article = Store.retrieveArticle();

    return (
      <div>
        <div
          className="container container--news-items"
        >
          <div
            className="news-items"
          >
            <NewsItem
              {...article}
            />
          </div>
        </div>

        <div
          className="container container--publication"
        >
          <TypeItem
            {...article.publication}
            type="publication"
          />
        </div>
      </div>
    )
  }
}

Article.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  })
};

export default Article;
