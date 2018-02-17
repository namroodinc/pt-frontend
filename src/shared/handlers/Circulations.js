import React from "react";
import { observer } from 'mobx-react';
import { Grid } from "material-ui";

import Store from "../stores/Store";
import { Loading } from "../components/Index";

@observer
class Publication extends React.Component {
  render() {
    if (Store.isLoading()) return <Loading />;

    return (
      <div>

        <div
          className="container"
        >

          <Grid
            container
            spacing={24}
          >

            <Grid
              item
              xs={12}
            >
              aasd
            </Grid>

          </Grid>

        </div>

      </div>
    )
  }
}

export default Publication;
