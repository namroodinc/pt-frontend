import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Link } from "react-router-dom";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { Loading } from "../components/Index";

const styles = theme => ({
  table: {
    // minWidth: 700
  }
});

@observer
class Publication extends React.Component {
  componentWillMount() {
    Actions.updatePublicationList();
  }

  render() {
    const { classes } = this.props;
    if (Store.isLoading()) return <Loading />;

    const data = Store.getAllCirculations;

    return (
      <div>

        <div
          className="container"
        >

          <Table
            className={classes.table}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  Publication
                </TableCell>
                <TableCell>
                  Year
                </TableCell>
                <TableCell
                  numeric
                >
                  Circulation
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((c, i) =>
                <TableRow
                  key={i}
                >
                  <TableCell>
                    <Link
                      style={{
                        color: c.fill
                      }}
                      to={`/publication/${c.id}`}
                    >
                      {c.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {c.circulations[0].date.getFullYear()}
                  </TableCell>
                  <TableCell
                    numeric
                  >
                    {c.circulations[0].value.toLocaleString()}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

        </div>

      </div>
    )
  }
}

Publication.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Publication);
