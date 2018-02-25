import React from "react";
import { observer } from "mobx-react";

import { PublicationListItem } from "./Data/Index";

import Store from "../stores/Store";

@observer
export default class PublicationList extends React.Component {
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
