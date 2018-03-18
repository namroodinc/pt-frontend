import React from "react";
import { observer } from "mobx-react";
import { Grid } from "material-ui";

import { PublicationList, TrendingTopics } from "../components/Index";

import Actions from "../actions/Actions";

@observer
class Home extends React.Component {
  componentWillMount() {
    Actions.updatePublicationList();
  }

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
            md={8}
            xs={12}
          >
            <PublicationList />
          </Grid>

          <Grid
            item
            md={4}
            xs={12}
          >
            <TrendingTopics />
          </Grid>

        </Grid>

      </div>
    )
  }
}

export default Home;
