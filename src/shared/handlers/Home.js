import React from "react";
import { observer } from "mobx-react";
import { Grid } from "material-ui";
import ListSubheader from "material-ui/List/ListSubheader";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import { TrendingUp } from "material-ui-icons";

import { PublicationList } from "../components/Index";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
class Home extends React.Component {
  componentWillMount() {
    Actions.updatePublicationList();
  }

  render() {
    const trends = Store.getTrendingTopicsNoPrej;
    console.log(trends);
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
            <List
              component="nav"
              subheader={<ListSubheader
                component="div"
              >
                <ListItemIcon>
                  <TrendingUp />
                </ListItemIcon>
                Trending topics
              </ListSubheader>}
            >
              {trends.map((trend, i) =>
                <ListItem
                  key={i}
                >
                  <ListItemText
                    primary={trend.trend}
                  />
                </ListItem>
              )}
            </List>
          </Grid>

        </Grid>

      </div>
    )
  }
}

export default Home;
