import React from "react";
import { observer } from "mobx-react";

import { Loading, NewsItems, TypeItem } from "../components/Index";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
class PageType extends React.Component {
  componentDidMount() {
    const { publicationId, trendId } = this.props.match.params;

    if (publicationId !== undefined) Actions.getPublication(publicationId);
    if (trendId !== undefined) Actions.getTrend(trendId);
  }

  componentWillUnmount() {
    // Store.reset();
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const { publicationId, trendId } = this.props.match.params;

    let item = [];
    if (publicationId !== undefined) item = Store.retrievePublication();
    if (trendId !== undefined) item = Store.retrieveTrend();

    const articles = Store.retrieveArticles();

    return (
      <div>
        <div
          className="container container--publication"
        >

          <TypeItem
            {...item}
          />

        </div>

        <div
          className="container container--news-items"
        >

          <NewsItems
            articles={articles}
          />

        </div>
      </div>
    )
  }
}

export default PageType;
