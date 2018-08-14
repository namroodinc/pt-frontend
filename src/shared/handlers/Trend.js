import React from "react";
import { observer } from "mobx-react";

import { Loading, NewsItems, TrendItem } from "../components/Index";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
class Publication extends React.Component {
  componentDidMount() {
    Actions.getTrend(this.props.match.params.trendId);
  }

  componentWillUnmount() {
    Store.reset();
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const { trend, results } = Store.retrieveTrend();

    return (
      <div>
        <div
          className="container container--trend"
        >

          <TrendItem
            {...trend}
          />

        </div>

        <div
          className="container container--news-items"
        >

          <NewsItems
            articles={results}
          />

        </div>
      </div>
    )
  }
}

export default Publication;
