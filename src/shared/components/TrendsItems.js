import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { Loading, TrendsItem } from "./Index";

@observer
class TrendsItems extends React.Component {
  componentDidMount() {
    Actions.getTrends();
  }

  componentWillUnmount() {
    // Store.reset();
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const trends = Store.retrieveTrends();

    return (
      <div
        className="container"
      >

        <div
          className="cube"
        >
          {trends.map((trend, i) =>
            <TrendsItem
              key={i}
              {...trend}
            />
          )}
        </div>

      </div>
    );
  }
}

TrendsItems.defaultProps = {
  trends: []
};

TrendsItems.propTypes = {
  trends: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};

export default TrendsItems;
