import React from "react";
import { observer } from "mobx-react";

import { Loading, NewsItem, PublicationItem, ReviewMessage } from "../components/Index";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
class Article extends React.Component {
  componentDidMount() {
    Actions.getArticle(this.props.match.params.articleId);
  }

  componentWillUnmount() {
    // Store.reset();
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const article = Store.retrieveArticle();

    return (
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

        <PublicationItem
          {...article.publication}
        />

        <ReviewMessage
          articleId={article._id}
        />
      </div>
    )
  }
}

export default Article;
