import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import ListSubheader from "material-ui/List/ListSubheader";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import { TrendingUp } from "material-ui-icons";

import { Flame } from "./Icons/Index";
import Store from "../stores/Store";

const styles = theme => ({
  list: {
    marginBottom: 24,
    paddingBottom: 15
  }
});

@observer
class TrendingTopics extends React.Component {
  render() {
    const { classes } = this.props;
    const trendsTop15 = Store.getTrendingTopicsNoPrej.slice(0, 15);

    return (
      <List
        className={classes.list}
        component="nav"
        subheader={<ListSubheader
          component="div"
        >
          <ListItemIcon>
            <TrendingUp />
          </ListItemIcon>
          Trending Topics
        </ListSubheader>}
      >
        {trendsTop15.map((trend, i) =>
          <ListItem
            key={i}
          >
            <ListItemText
              primary={trend.trend}
            />
            {trend.count >= 40 &&
              <ListItemIcon>
                <Flame
                  height={20}
                  width={20}
                />
              </ListItemIcon>
            }
          </ListItem>
        )}
      </List>
    );
  }
}

TrendingTopics.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TrendingTopics);
