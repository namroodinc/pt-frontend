import React from "react";
import { observer } from "mobx-react";
import { Grid } from "material-ui";

import { PublicationList } from "../components/Index";
import { Circulations } from "../components/Charts/Index";
import { LinkCard } from "../components/Data/Index";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
class Page extends React.Component {
  componentWillMount() {
    Actions.updatePublicationList();
  }

  render() {
    const { colorScale, data } = Store.getLast5Circulations;

    console.log(data);

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
            md={7}
          >
            <PublicationList />
          </Grid>

          <Grid
            item
            xs={12}
            md={5}
          >

            <LinkCard
              linkHref="/circulations"
              title="List of Newspapers in the United Kingdom by circulation"
            >
              <Circulations
                colorScale={colorScale}
                data={data}
              />
            </LinkCard>

            <LinkCard
              linkHref="/circulations"
              title="List of Newspapers in the United Kingdom by circulation"
            />

          </Grid>

        </Grid>

      </div>
    )
  }
}

export default Page;
