import React from "react";
import { observer } from "mobx-react";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { Line } from "../components/Charts/Index";
import { Loading } from "../components/Index";

@observer
class Publication extends React.Component {
  componentWillMount() {
    Actions.updatePublicationList();
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const allCirculations = Store.getAllCirculations;
    const data = allCirculations.map(data => data.circulations);

    return (
      <div>

        <div
          className="container"
        >

          <Line
            data={data}
          />

        </div>

      </div>
    )
  }
}

export default Publication;
