import React from "react";
import { observer } from "mobx-react";

import { Loading, TypeItem } from "../../components/Index";

import Actions from "../../actions/Actions";
import Store from "../../stores/Store";

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
        {publications.map((publication, i) =>
          <div
            className="container container--publication"
            key={i}
          >
            <TypeItem
              {...publication}
              editMode
            />
          </div>
        )}
      </div>
    )
  }
}

export default Publications;
