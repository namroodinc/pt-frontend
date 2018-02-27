import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Link } from "react-router-dom";
import Avatar from "material-ui/Avatar";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import { ArrowDropDown, ArrowDropUp } from "material-ui-icons"; // , PlayArrow
import { red, green } from "material-ui/colors";

import { Time } from "../components/Data/Index";
import { Loading } from "../components/Index";
import Store from "../stores/Store";

const styles = (theme) => ({
  avatar: {
    float: 'left',
    height: 20,
    marginRight: 10,
    width: 20
  },
  centerAlign: {
    padding: '0 20px',
    textAlign: 'center'
  }
});

@observer
class PublicationList extends React.Component {
  render() {
    if (Store.isLoadingEntry()) return <Loading />;
    const { classes } = this.props;

    const publicationList = Store.retrievePublicationList;

    return (
      <div
        className="publication-list"
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Publication
              </TableCell>
              <TableCell
                className={classes.centerAlign}
                numeric
              >
                Rating
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {publicationList.map((publication, i) =>
              <TableRow
                key={i}
              >
                <TableCell>
                  <Link
                    style={{
                      color: publication.fill,
                      display: 'block',
                      overflow: 'hidden'
                    }}
                    to={`/publication/${publication.id}`}
                  >
                    <Avatar
                      alt={publication.name}
                      className={classes.avatar}
                      src={publication.assetUrl}
                    />
                    {publication.name}
                  </Link>
                  <Time
                    dateTime={publication.updatedAt}
                    dateTimeFormat="[Last updated:] MMM. DD, HH:mm"
                  />
                </TableCell>
                <TableCell
                  className={classes.centerAlign}
                >
                  {publication.currentRating !== 0 ?
                    <span
                      className="rating"
                    >
                      <span
                        className="rating__metric"
                        style={{
                          color: publication.currentRating < 50 ? red[500] : green[500]
                        }}
                      >
                        {publication.currentRating}%
                      </span>
                      {publication.overallRating.length > 0 &&
                        <span
                          className="rating__metric rating__metric--difference"
                          style={{
                            color: publication.ratingDiff < 0 ? red[500] : green[500]
                          }}
                        >
                          {publication.ratingDiff < 0 ?
                            <ArrowDropDown /> : <ArrowDropUp />
                          }
                          {publication.ratingDiff}%
                        </span>
                      }
                    </span> : <span
                      className="rating"
                    >
                      Not rated yet.
                    </span>
                  }
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

PublicationList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PublicationList);
