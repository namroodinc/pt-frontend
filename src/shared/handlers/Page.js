import React from "react";
import { observer } from 'mobx-react';
import PropTypes from "prop-types";

import Actions from "../actions/Actions";
import Store from "../stores/Store";


@observer
class Page extends React.Component {
  componentWillMount() {
    const { entryId } = this.props;
    // Actions.updateEntry(entryId);
  }

  render() {
    const entry = Store.retrieveEntry();
    const { showPortfolio, text, title } = entry;
    return (
      <div
        className="container"
      >

      </div>
    )
  }
}

Page.propTypes = {
  entryId: PropTypes.string
};

export default Page;
