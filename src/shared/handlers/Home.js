import React from "react";
import { observer } from "mobx-react";

import { Loading } from "../components/Index";

import Store from "../stores/Store";

@observer
class Home extends React.Component {
  componentWillMount() {
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    return (
      <div>
        Home
      </div>
    )
  }
}

export default Home;
