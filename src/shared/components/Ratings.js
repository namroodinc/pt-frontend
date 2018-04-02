import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Avatar, Divider } from "material-ui";
import List, { ListItem, ListItemIcon, ListItemText, ListSubheader } from "material-ui/List";
import { Star } from "material-ui-icons";

import Store from "../stores/Store";

const styles = theme => ({
  list: {
    marginBottom: 24,
    paddingBottom: 15
  },
  listItem: {
    paddingBottom: 7,
    paddingTop: 7
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
          <div
            key={i}
          >
            <ListItem
              className={classes.listItem}
            >
              <Link
                to={`/publication/${publication.id}`}
              >
                <Avatar
                  alt={publication.name}
                  src={publication.assetUrl}
                />
              </Link>
              <ListItemText
                primary={<Link
                  to={`/publication/${publication.id}`}
                >
                  {publication.name}
                </Link>}
                secondary={<span
                  className="rating"
                >
                  Rated <Link
                    to={`/ratings`}
                  >
                    {publication.ratings[0].value}%
                  </Link>
                </span>}
              />
            </ListItem>
            {(top10Ratings.length - 1) !== i &&
              <Divider
                inset
              />
            }
          </div>
        )}
      </List>
    );
  }
}

Ratings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Ratings);
