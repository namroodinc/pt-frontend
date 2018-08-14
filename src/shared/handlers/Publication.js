import React from "react";
import { observer } from "mobx-react";

import { Loading, NewsItems, PublicationItem } from "../components/Index";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
class Publication extends React.Component {
  componentDidMount() {
    Actions.getPublication(this.props.match.params.publicationId);
  }

  componentWillUnmount() {
    // Store.reset();
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const { publication, results } = Store.retrievePublication();

    return (
      <div>
        <div
          className="container container--publication"
        >

          <PublicationItem
            {...publication}
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
