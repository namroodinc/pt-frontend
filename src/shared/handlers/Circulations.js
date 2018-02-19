import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Link } from "react-router-dom";
import { MenuItem } from "material-ui/Menu";
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import IconButton from "material-ui/IconButton";
import PlayArrow from "material-ui-icons/PlayArrow";
import classNames from "classnames";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { Loading } from "../components/Index";

const styles = theme => ({
  iconButton: {
    color: '#026FC9',
    height: 30,
    width: 30,
    disabled: {
      color: 'grey'
    }
  },
  iconButtonIcon: {
  },
  iconButtonRotate: {
    transform: 'rotate(180deg)'
  }
});

@observer
class Circulations extends React.Component {
  componentWillMount() {
    Actions.updatePublicationList();
  }

  handleChange = (event) => {
    Actions.updateCirculationYear(event.target.value);
  };

  handleGetPreviousYear = () => {
    Actions.updateCirculationYear(Store.getPreviousCirculationYear);
  };

  handleGetNextYear = () => {
    Actions.updateCirculationYear(Store.getNextCirculationYear);
  };

  render() {
    const { classes } = this.props;
    if (Store.isLoading()) return <Loading />;

    const allYears = Store.getAllCirculationYears;
    const data = Store.getAllCirculations;
    const year = Store.retrieveCirculationYear();
    const yearCheck = Store.checkIfYearExistsBeforeOrAfter;
    const { disableFirst, disableLast } = yearCheck;

    return (
      <div
        className="container"
      >

        <div
          className="container__narrow"
        >
          <IconButton
            aria-label="Previous Year"
            className={classNames(classes.iconButton)}
            disabled={disableFirst}
            onClick={this.handleGetPreviousYear}
          >
            <PlayArrow
              className={classNames(classes.iconButtonRotate, classes.iconButtonIcon)}
            />
          </IconButton>

          <FormControl>
            <Select
              value={year}
              onChange={this.handleChange}
              name="Year"
            >
              {allYears.map((year, i) =>
                <MenuItem
                  key={i}
                  value={year}
                >
                  {year}
                </MenuItem>
              )}
            </Select>
          </FormControl>

          <IconButton
            aria-label="Next Year"
            className={classNames(classes.iconButton)}
            disabled={disableLast}
            onClick={this.handleGetNextYear}
          >
            <PlayArrow
              className={classNames(classes.iconButtonIcon)}
            />
          </IconButton>
        </div>

        <div
          className="container__narrow"
        >

          <Table>
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

Circulations.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Circulations);
