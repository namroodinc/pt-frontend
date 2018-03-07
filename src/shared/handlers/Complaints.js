import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Tabs, { Tab } from "material-ui/Tabs";
// import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
// import { Link } from "react-router-dom";
// import Avatar from 'material-ui/Avatar';

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { Banner, Loading } from "../components/Index";
// import { Time } from "../components/Data/Index";

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
      value: 'all'
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
    // const { classes } = this.props;

    const { bodyCopy, title } = Store.retrievePage();
    // const getAllCountries = Store.getAllCountries;

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
            >
              <Tab
                label="All Regulators"
                value="all"
              />
              <Tab
                label="Independent Press Standards Organisation"
                value="ipso"
              />
              <Tab
                label="Press Complaints Commission"
                value="pcc"
              />
            </Tabs>
          </div>
        </div>

        <div
          className="container"
        >
          Table goes here
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
