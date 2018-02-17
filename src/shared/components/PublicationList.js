import React from "react";
import { observer } from "mobx-react";

import { PublicationListItem } from "./Data/Index";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
export default class PublicationList extends React.Component {
  componentWillMount() {
    Actions.updatePublicationList();
  }

  render() {
    const publicationList = Store.retrievePublicationList;

    return (
      <div
        className="publication-list"
      >
        {publicationList.map((publication, i) =>
          <PublicationListItem
            key={i}
            publication={publication}
          />
        )}
      </div>
    );
  }
}
