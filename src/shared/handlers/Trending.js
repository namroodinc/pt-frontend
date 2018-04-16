import React from "react";
import { observer } from "mobx-react";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
class Trending extends React.Component {
  componentWillMount() {
    Actions.updatePublicationList();
  }

  render() {
    const trendsDays = Store.getLast7PossibleDaysTrending;
    const trends = Store.getTrendingTopicsNoPrej;

    console.log(trendsDays);
    console.log(trends);

    return (
      <div
        className="container"
      >

        asdasd

      </div>
    )
  }
}

export default Trending;
