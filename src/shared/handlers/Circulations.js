import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import { Avatar, IconButton, Select } from "material-ui";
import { FormControl, FormLabel } from "material-ui/Form";
import { MenuItem } from "material-ui/Menu";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import PlayArrow from "material-ui-icons/PlayArrow";
import classNames from "classnames";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { Banner, ContentWithSidebar, Loading } from "../components/Index";

const styles = theme => ({
  avatar: {
    float: 'left',
    height: 20,
    marginRight: 10,
    width: 20
  },
  formControl: {
    marginBottom: 15
  },
  formLabel: {
    fontSize: 14,
    whiteSpace: 'nowrap'
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
  },
  numeric: {
    fontFamily: '"Inconsolata", monospace',
    fontSize: '1.1em'
  },
  select: {
    marginTop: '0 !important'
  }
});

@observer
class Circulations extends React.Component {
  componentWillMount() {
    const { pageId } = this.props;
    Actions.getPageWithPublicationList(pageId);
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
    if (Store.isLoading()) return <Loading />;
    const { classes } = this.props;

    const allYears = Store.getAllCirculationYears;
    const data = Store.getAllCirculationsForGivenYear;
    const year = Store.retrieveCirculationYear();

    const { disableFirst, disableLast } = Store.checkIfYearExistsBeforeOrAfter;
    const { bodyCopy, title } = Store.retrievePage();

    return (
      <ContentWithSidebar>
        <Banner
          title={title}
          description={bodyCopy}
        />

        <FormControl
          className={classes.formControl}
        >
          <FormLabel
            className={classes.formLabel}
          >
            Filter circulations by year
          </FormLabel>
          <Select
            className={classes.select}
            inputProps={{
              color: 'primary'
            }}
            name="Year"
            onChange={this.handleChange}
            value={year}
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

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Publication
              </TableCell>
              <TableCell
                numeric
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
                  className={classes.numeric}
                  numeric
                >
                  {c.circulations[0].date.getFullYear()}
                </TableCell>
                <TableCell
                  className={classes.numeric}
                  numeric
                >
                  {c.circulations[0].value.toLocaleString()}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      </ContentWithSidebar>
    )
  }
}

Circulations.propTypes = {
  classes: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired
};

export default withStyles(styles)(Circulations);
