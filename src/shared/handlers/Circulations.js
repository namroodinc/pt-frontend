import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Link } from "react-router-dom";
import Avatar from "material-ui/Avatar";
import { MenuItem } from "material-ui/Menu";
import { FormControl } from "material-ui/Form";
import { InputLabel } from 'material-ui/Input';
import Select from "material-ui/Select";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import IconButton from "material-ui/IconButton";
import PlayArrow from "material-ui-icons/PlayArrow";
import classNames from "classnames";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { Banner, Loading } from "../components/Index";

const styles = theme => ({
  avatar: {
    float: 'left',
    height: 20,
    marginRight: 10,
    width: 20
  },
  centerAlign: {
    padding: '0 20px',
    textAlign: 'center'
  },
  formControl: {
    marginBottom: 15
  },
  iconButton: {
    color: '#026FC9',
    height: 20,
    marginLeft: 5,
    marginRight: 5,
    marginTop: -3,
    width: 20
  },
  iconButtonIcon: {
    height: 20,
    width: 20
  },
  iconButtonRotate: {
    transform: 'rotate(180deg)'
  },
  inputLabel: {
    whiteSpace: 'nowrap'
  }
});

@observer
class Circulations extends React.Component {
  componentWillMount() {
    const { pageId } = this.props;

    Actions.getPage(pageId);
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
    if (Store.isLoadingEntry() && Store.isLoadingPage()) return <Loading />;

    const allYears = Store.getAllCirculationYears;
    const data = Store.getAllCirculationsForGivenYear;
    const year = Store.retrieveCirculationYear();
    const yearCheck = Store.checkIfYearExistsBeforeOrAfter;
    const { disableFirst, disableLast } = yearCheck;
    const pageContent = Store.retrievePage();
    const { bodyCopy, title } = pageContent.fields;

    return (
      <div
        className="container"
      >

        <div
          className="container__narrow"
        >
          <Banner
            title={title}
            description={bodyCopy}
          />
        </div>

        <div
          className="container__narrow"
        >
          <FormControl
            className={classes.formControl}
          >
            <InputLabel
              className={classes.inputLabel}
            >
              Filter circulations by year
            </InputLabel>
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
                <TableCell
                  className={classes.centerAlign}
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
                  Year
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
                      <Avatar
                        alt={c.name}
                        className={classes.avatar}
                        src={c.assetUrl}
                      />
                      {c.name}
                    </Link>
                  </TableCell>
                  <TableCell
                    className={classes.centerAlign}
                  >
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
  classes: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired
};

export default withStyles(styles)(Circulations);
