import React from "react";
import { observer } from 'mobx-react';
import PropTypes from "prop-types";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import {
  Banner,
  PortfolioList
} from "../components/Index";

@observer
class Page extends React.Component {
  componentWillMount() {
    const { entryId } = this.props;
    Actions.updateEntry(entryId);
  }

  render() {
    const entry = Store.retrieveEntry();
    const { showPortfolio, text, title } = entry;
    return (
      <div
        className="container"
      >

        <Banner
          title={title}
          description={text}
        />

        {showPortfolio &&
          <PortfolioList />
        }

      </div>
    )
  }
}

Page.propTypes = {
  entryId: PropTypes.string
};

export default Page;
