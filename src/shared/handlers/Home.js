import React from "react";
import { observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import Icon from '@material-ui/core/Icon';
import PropTypes from "prop-types";

import { Loading, NewsItems, Search, Shell, TrendsItems } from "../components/Index";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

const styles = theme => ({
  iconFontSize: {
    fontSize: 'inherit'
  }
});

@observer
class Home extends React.Component {
  componentDidMount() {
    Actions.getArticles();
  }

  componentWillUnmount() {
    // Store.reset();
  }

  handleLoadMoreNewsItems = () => {
    Actions.getArticles(false);
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const { classes } = this.props;

    const articles = Store.retrieveArticles();

    return (
      <div>
        <Shell>
          <TrendsItems />
        </Shell>

        <Shell>
          <Search />
        </Shell>

        <div
          className="container container--news-items"
        >
          <NewsItems
            articles={articles}
          />

          <div
            className="button-group button-group--loading-more"
          >
            <button
              className="circle-button circle-button--large"
              onClick={this.handleLoadMoreNewsItems}
            >
              <Icon
                className={classes.iconFontSize}
              >
                more_horiz
              </Icon>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
