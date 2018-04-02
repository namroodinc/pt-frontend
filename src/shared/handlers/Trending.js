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
    const trends = Store.getTrendingTopicsPerPublication;

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
