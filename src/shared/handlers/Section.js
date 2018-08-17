import React from "react";
import { observer } from "mobx-react";

import { Loading, NewsItems, TrendItem } from "../components/Index";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
class Section extends React.Component {
  componentDidMount() {
    Actions.getSection(this.props.match.params.sectionId);
  }

  componentWillUnmount() {
    Store.reset();
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const articles = Store.retrieveArticles();
    const section = Store.retrieveSection();

    return (
      <div>
        <div
          className="container container--section"
        >

          <TrendItem
            {...section}
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

export default Section;
