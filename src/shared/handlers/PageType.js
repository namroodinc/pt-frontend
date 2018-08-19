import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import { Loading, NewsItems, TypeItem } from "../components/Index";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
class PageType extends React.Component {
  componentDidMount() {
    Store.reset();
    const { match, type } = this.props;
    Actions.getPageType(type, match.params.id);
  }

  componentWillUnmount() {
    Store.reset();
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const { type } = this.props;

    const page = Store.retrievePageType(type);
    const articles = Store.retrieveArticles();

    const className = `container container--${type}`;

    return (
      <div>
        <div
          className={className}
        >
          <TypeItem
            {...page}
            type={type}
          />
        </div>

        <div
          className="container container--news-items"
        >
          <NewsItems
            articles={articles}
          />
        </div>
      </div>
    )
  }
}

PageType.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }),
  type: PropTypes.string.isRequired
};

export default PageType;
