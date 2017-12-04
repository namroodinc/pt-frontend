import React from "react";
import { observer } from 'mobx-react';
import request from "superagent";

import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';

import Actions from "../actions/Actions";
import Store from "../stores/Store";
import getApi from "../utils/getApi";

const CONTENTFUL_BASE_URL = process.env.CONTENTFUL_BASE_URL;
const CONTENT_DELIVERY_ACCESS_TOKEN = process.env.CONTENT_DELIVERY_ACCESS_TOKEN;
const SPACE_ID = process.env.SPACE_ID;

@observer
export default class Portfolio extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    Actions.updatePortfolioList();
  }

  render() {
    const portfolioList = Store.retrievePortfolioList();

    const mapPortfolioList = portfolioList.map(data => {
      const ASSET_ID = data.fields.featuredMedia.sys.id;

      getApi(`${CONTENTFUL_BASE_URL}/spaces/${SPACE_ID}/assets/${ASSET_ID}?access_token=${CONTENT_DELIVERY_ACCESS_TOKEN}`)
        .then(value => {
          featuredMedia = value;
        });

      return {
        featuredMedia
      }
    });

    console.log(mapPortfolioList)

    return (
      <header>

        <h5>
          Portfolio
        </h5>

        <GridList
          cellHeight={240}
        >

        </GridList>

      </header>
    );
  }
}
