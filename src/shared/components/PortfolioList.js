import React from "react";
import { observer } from 'mobx-react';

import Asset from "./Asset";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
export default class PortfolioList extends React.Component {
  componentWillMount() {
    Actions.updatePortfolioList();
  }

  render() {
    const portfolioList = Store.retrievePortfolioList();

    const mappedPortfolioList = portfolioList.map((item, i) => {
      const { featuredMedia, title } = item.fields;
      return {
        title,
        featuredMedia: featuredMedia.sys.id
      }
    });

    return (
      <div
        className="portfolio-list"
      >
        {mappedPortfolioList.map((item, i) =>
          <div
            className="portfolio-list__item"
            key={i}
          >
            <Asset
              assetId={item.featuredMedia}
              title={item.title}
            />
            <div
              className="portfolio-list__item__content"
            >
              <h3>
                {item.title}
              </h3>
            </div>
          </div>
        )}
      </div>
    );
  }
}
