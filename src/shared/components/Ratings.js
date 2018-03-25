import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Avatar from 'material-ui/Avatar';
import ListSubheader from "material-ui/List/ListSubheader";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import { Star } from "material-ui-icons";

import Store from "../stores/Store";

const styles = theme => ({
  list: {
    marginBottom: 24
  }
});

@observer
class Ratings extends React.Component {
  render() {
    const { classes } = this.props;
    const top10Ratings = Store.getTop10Ratings;

    return (
      <List
        className={classes.list}
        component="nav"
        subheader={<ListSubheader
          component="div"
        >
          <ListItemIcon>
            <Star />
          </ListItemIcon>
          Latest Ratings
        </ListSubheader>}
      >
        {top10Ratings.map((publication, i) =>
          <ListItem
            key={i}
          >
            <Avatar
              alt={publication.name}
              src={publication.assetUrl}
            />
            <ListItemText
              primary={<Link
                to={`/publication/${publication.id}`}
              >
                {publication.name}
              </Link>}
              secondary={<span>
                Rated <Link
                  to={`/ratings`}
                >
                  {publication.ratings[0].value}%
                </Link>
              </span>}
            />
          </ListItem>
        )}
      </List>
    );
  }
}

Ratings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Ratings);
