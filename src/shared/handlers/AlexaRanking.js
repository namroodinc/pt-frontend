import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import moment from "moment";
import { withStyles } from "material-ui/styles";
import { Link } from "react-router-dom";
import Avatar from 'material-ui/Avatar';
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { Loading } from "../components/Index";

const styles = theme => ({
  avatar: {
    float: 'left',
    height: 20,
    marginRight: 10,
    width: 20
  }
});

@observer
class AlexaRanking extends React.Component {
  componentWillMount() {
    Actions.updatePublicationList();
  }

  render() {
    if (Store.isLoading()) return <Loading />;
    const { classes } = this.props;

    const getLast7PossibleDaysAlexa = Store.getLast7PossibleDaysAlexa;
    const getAlexaRankingsForLast7Days = Store.getAlexaRankingsForLast7Days;

    return (
      <div
        className="container"
      >

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Publication
              </TableCell>
              {getLast7PossibleDaysAlexa.map((day, i) =>
                <TableCell
                  key={i}
                >
                  {moment(day).format('DD')} {moment(day).format('MMMM')}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {getAlexaRankingsForLast7Days.map((publication, i) =>
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
                </TableCell>
                {publication.rankings.map((day, i) =>
                  <TableCell
                    key={i}
                    numeric
                  >
                    {day !== undefined ?
                      <span>
                        {day.value.toLocaleString()}
                      </span> : <span
                        style={{
                          color: '#F0F0F0'
                        }}
                      >
                        N/A
                      </span>
                    }
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

      </div>
    )
  }
}

AlexaRanking.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AlexaRanking);
