import React from "react";
import { observer } from "mobx-react";

import { Loading, TypeItem } from "../../components/Index";

import Actions from "../../actions/Actions";
import Store from "../../stores/Store";

@observer
class Ideologies extends React.Component {
  componentDidMount() {
    Actions.getIdeologies();
  }

  componentWillUnmount() {
    // Store.reset();
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const ideologies = Store.retrieveIdeologies();

    const isEditMode = process.env.MODE === 'edit';

    return (
      <div
        className="container"
      >
        {ideologies.map((ideology, i) =>
          <div
            className="container container--ideology"
            key={i}
          >
            <TypeItem
              {...ideology}
              characterLimit={600}
              editMode={isEditMode}
              rows={7}
              type="ideology"
            />
          </div>
        )}
      </div>
    )
  }
}

export default Ideologies;
