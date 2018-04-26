import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import { Select } from "material-ui";
import { FormControl, FormLabel } from "material-ui/Form";
import { MenuItem } from "material-ui/Menu";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import {
  Banner,
  ContentWithSidebar,
  Loading
} from "../components/Index";

import {
  Bar
} from "../components/Charts/Index";

const styles = theme => ({
  formControl: {
    marginBottom: 15
  },
  formLabel: {
    fontSize: 14,
    whiteSpace: 'nowrap'
  },
  select: {
    marginTop: '0 !important'
  }
});

@observer
class Circulations extends React.Component {
  componentDidMount() {
    const { pageId } = this.props;
    Actions.getPageWithPublicationList(pageId);
  }

  handleChange = (event) => {
    Actions.updateCirculationYear(event.target.value);
  };

  render() {
    if (Store.isLoading()) return <Loading />;
    const { classes } = this.props;

    const allYears = Store.getAllCirculationYears;
    const data = Store.getAllCirculationsForGivenYear;
    const chartData = Store.getAllCirculationsForGivenYearBarChart;
    const year = Store.retrieveCirculationYear();

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

        <Bar
          axes="left"
          axisFormat={(t) => t.toLocaleString()}
          data={chartData}
          domainPaddingX={50}
          horizontal
          height={300}
          invertAxis
          padding={{
            left: 120,
            right: 20
          }}
        />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Publication
              </TableCell>
              <TableCell
                numeric
              >
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
                <TableCell
                  numeric
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

      </ContentWithSidebar>
    )
  }
}

Circulations.propTypes = {
  classes: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired
};

export default withStyles(styles)(Circulations);
