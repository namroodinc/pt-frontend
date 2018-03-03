import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Tabs, { Tab } from "material-ui/Tabs";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import { Link } from "react-router-dom";
import Avatar from 'material-ui/Avatar';

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { Banner, Loading } from "../components/Index";
import { Time } from "../components/Data/Index";

const styles = theme => ({
  avatar: {
    float: 'left',
    height: 20,
    marginRight: 10,
    width: 20
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

  handleChange = (event, value) => {
    console.log(value)
    this.setState({
      value
    });
  };

  render() {
    if (Store.isLoading()) return <Loading />;
    const { classes } = this.props;

    const { bodyCopy, title } = Store.retrievePage();
    const getAllCountries = Store.getAllCountries;
    const getAllPricesByCountry = Store.getAllPricesByCountry;

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
          className="container--full-width"
        >
          <div
            className="container__tabs"
          >
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              fullWidth
            >
              {getAllCountries.map((country, i) =>
                <Tab
                  key={i}
                  label={country}
                  value={country}
                />
              )}
            </Tabs>
          </div>
        </div>

        <div
          className="container"
        >
          {getAllPricesByCountry.map((prices, i) =>
            <div
              key={i}
            >
              {this.state.value === prices.country &&
                <div>
                  <h3>
                    {prices.country} publication prices
                  </h3>

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
                          Last updated
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
                          <TableCell>
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
                                  {paper.price} ({paper.currency})
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
                            <Time
                              dateTime={paper.timestamp}
                              dateTimeFormat="[Last updated:] MMM. DD"
                            />
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
                              {paper.name}
                            </Link>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              }
            </div>
          )}
        </div>

      </div>
    )
  }
}

Prices.propTypes = {
  classes: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired
};

export default withStyles(styles)(Prices);
