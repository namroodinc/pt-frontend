import React from "react";
import { observer } from "mobx-react";
import { Grid } from "material-ui";

import { PublicationList } from "../components/Index";

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

          <PublicationList />

        </Grid>

      </div>
    )
  }
}

export default Home;
