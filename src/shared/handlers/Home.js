import React from "react";
import { Grid } from "material-ui";

import { PublicationList } from "../components/Index";

class Page extends React.Component {
  render() {
    return (
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
            md={8}
          >
            <div
              className="container__narrow"
            >
              <PublicationList />
            </div>
          </Grid>

        </Grid>

      </div>
    )
  }
}

export default Page;
