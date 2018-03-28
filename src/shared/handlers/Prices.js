import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import { Avatar, Select } from "material-ui";
import { FormControl, FormLabel } from "material-ui/Form";
import { MenuItem } from "material-ui/Menu";

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
  select: {
    marginTop: '0 !important'
  }
});

@observer
class Prices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'United Kingdom'
    }
  }

  componentWillMount() {
    const { pageId } = this.props;
    Actions.getPageWithPublicationList(pageId);
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  };

  render() {
    if (Store.isLoading()) return <Loading />;
    const { classes } = this.props;

    const { bodyCopy, title } = Store.retrievePage();
    const getAllCountries = Store.getAllCountries;
    const getAllPricesByCountry = Store.getAllPricesByCountry;

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
            value={this.state.value}
          >
            {getAllCountries.map((country, i) =>
              <MenuItem
                key={i}
                value={country}
              >
                {country}
              </MenuItem>
            )}
          </Select>
        </FormControl>

        <div>
          {getAllPricesByCountry.map((prices, i) =>
            <div
              key={i}
            >
              {this.state.value === prices.country &&
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        Price
                      </TableCell>
                      <TableCell>
                        Newspaper/Magazine
                      </TableCell>
                      <TableCell>
                        Publication
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {prices.pricesArray.map((paper, i) =>
                      <TableRow
                        key={i}
                      >
                        <TableCell
                          numeric
                        >
                          <span
                            style={{
                              color: paper.fill,
                              display: 'block'
                            }}
                          >
                            {paper.price === 0 ?
                              <span>
                                Free
                              </span> : <span>
                                {paper.symbol}
                                {paper.price}
                              </span>
                            }
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            style={{
                              color: paper.fill,
                              display: 'block'
                            }}
                          >
                            {paper.name}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Link
                            style={{
                              color: paper.fill,
                              display: 'block',
                              overflow: 'hidden'
                            }}
                            to={`/publication/${paper.id}`}
                          >
                            <Avatar
                              alt={paper.name}
                              className={classes.avatar}
                              src={paper.assetUrl}
                            />
                            {paper.publication}
                          </Link>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              }
            </div>
          )}
        </div>

      </ContentWithSidebar>
    )
  }
}

Prices.propTypes = {
  classes: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired
};

export default withStyles(styles)(Prices);
