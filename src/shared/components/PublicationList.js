import React from "react";
import { observer } from "mobx-react";

import { Loading } from "../components/Index";
import { PublicationListItem } from "../components/Data/Index";
import Store from "../stores/Store";

@observer
class PublicationList extends React.Component {
  render() {
    if (Store.isLoading()) return <Loading />;

    const publicationList = Store.retrieveFeaturedPublications;

    return (
      <div
        className="publication-list"
      >
        {publicationList.map((publication, i) =>
          <PublicationListItem
            key={i}
            data={publication}
          />
        )}
      </div>
    );
  }
}

export default PublicationList;
