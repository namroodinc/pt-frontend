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
    const assets = Store.retrieveAssetsList();
    const publications = Store.retrievePublicationList();

    const publicationList = publications.map((publication, i) => {
      const { avatar, title } = publication.fields;
      const { updatedAt } = publication.sys;
      const { id } = publication.sys;
      const { description, name, overallRating } = publication.fields;
      const assetIdIndex = assets.find(asset => asset.sys.id === avatar.sys.id);

      return {
        assetUrl: assetIdIndex.fields.file.url,
        description,
        id,
        name,
        overallRating,
        title,
        updatedAt
      }
    });

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
