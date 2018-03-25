import React from "react";
import { observer } from "mobx-react";

import { ContentWithSidebar, Loading, PublicationList } from "../components/Index";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
class Home extends React.Component {
  componentWillMount() {
    Actions.updatePublicationList();
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    return (
      <ContentWithSidebar>
        <PublicationList />
      </ContentWithSidebar>
    )
  }
}

export default Home;
