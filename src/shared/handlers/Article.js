import React from "react";
import { observer } from "mobx-react";

import { Loading, NewsItem, ReviewMessage } from "../components/Index";

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
        <NewsItem
          {...article}
        />

        <ReviewMessage />
      </div>
    )
  }
}

export default Article;
