import React from "react";
import { observer } from "mobx-react";

import { Loading, Publication } from "../components/Index";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
class Publications extends React.Component {
  componentDidMount() {
    Actions.getPublications();
  }

  componentWillUnmount() {
    // Store.reset();
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const publications = Store.retrievePublications();

    return (
      <div
        className="container"
      >

        <div
          className="publications-grid"
        >
          {publications.map((publication, i) =>
            <Publication
              key={i}
              {...publication}
            />
          )}
        </div>

      </div>
    )
  }
}

export default Publications;
