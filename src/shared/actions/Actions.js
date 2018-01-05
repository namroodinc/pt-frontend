import { action } from "mobx";
import request from "superagent";

import Store from "../stores/Store";
import { CONTENTFUL_BASE_URL, CONTENT_DELIVERY_ACCESS_TOKEN, SPACE_ID } from "../utils/config";

class Actions {
  @action updateEntry(ENTRY_ID) {
    request
      .get(`${CONTENTFUL_BASE_URL}/spaces/${SPACE_ID}/entries/${ENTRY_ID}`)
      .query(`access_token=${CONTENT_DELIVERY_ACCESS_TOKEN}&content_type=publication`)
      .end(function(err, res) {
        if (err || !res.ok) {
          console.log('error');
        } else {
          Store.entry = res.body.fields;
        }
      });
  }

  @action updatePortfolioList() {
    request
      .get(`${CONTENTFUL_BASE_URL}/spaces/${SPACE_ID}/entries`)
      .query(`access_token=${CONTENT_DELIVERY_ACCESS_TOKEN}&content_type=publication`)
      .end(function(err, res) {
        if (err || !res.ok) {
          console.log('error');
        } else {
          // Store.assetsList = res.body.includes.Asset;
          Store.portfolioList = res.body.items;
        }
      });
  }
}

export default new Actions();
