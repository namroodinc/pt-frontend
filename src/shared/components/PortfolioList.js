import React from "react";
import { observer } from 'mobx-react';

import { Asset } from "./Index";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
export default class PortfolioList extends React.Component {
  componentWillMount() {
    Actions.updatePortfolioList();
  }

  render() {
    const assetsList = Store.retrieveAssetsList();
    const portfolioList = Store.retrievePortfolioList();

    const mappedPortfolioList = portfolioList.map((item, i) => {
      const { featuredMedia, title } = item.fields;
      const { id } = item.sys;
      const assetIdIndex = assetsList.find(data => data.sys.id === featuredMedia.sys.id);
      return {
        assetUrl: assetIdIndex.fields.file.url,
        entryId: id,
        title
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
            <div
              className="portfolio-list__item__content"
            >
              <Asset
                assetId={item.assetId}
                assetUrl={item.assetUrl}
                entryId={item.entryId}
                title={item.title}
              />
              <div
                className="portfolio-list__item__content__description"
              >
                <h3>
                  <a
                    href={`/portfolio/${item.entryId}`}
                  >
                    {item.title}
                  </a>
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
