import React from "react";
import { observer } from "mobx-react";
import { Grid } from "material-ui";

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
        <Grid
          container
          spacing={24}
        >
          {publicationList.map((publication, i) =>
            <Grid
              key={i}
              item
              md={4}
              sm={6}
              xs={12}
            >
              <PublicationListItem
                data={publication}
              />
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export default PublicationList;
