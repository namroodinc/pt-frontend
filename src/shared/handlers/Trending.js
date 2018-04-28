import React from "react";
import { observer } from "mobx-react";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import {
  Banner,
  Loading
} from "../components/Index";

@observer
class Trending extends React.Component {
  componentWillMount() {
    Actions.updatePublicationList();
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const trendsDays = Store.getLast7PossibleDaysTrending;
    const trends = Store.getTrendingTopicsNoPrej;

    console.log(trendsDays);
    console.log(trends);

    const title = "Trending";
    const bodyCopy = "Blurb about Trending *goes here*";

    return (
      <div
        className="container"
      >

        <div
          className="container__narrow"
        >
          <Banner
            title={title}
            description={bodyCopy}
          />
        </div>

      </div>
    )
  }
}

export default Trending;
