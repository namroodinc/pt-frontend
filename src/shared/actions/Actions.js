import { action } from "mobx";
import request from "superagent";

import Store from "../stores/Store";
import { CONTENTFUL_BASE_URL, CONTENT_DELIVERY_ACCESS_TOKEN, SPACE_ID } from "../utils/config";

class Actions {
  @action getEntry(ENTRY_ID) {
    Store.loadingEntry = true;
    request
      .get(`${CONTENTFUL_BASE_URL}/spaces/${SPACE_ID}/entries/${ENTRY_ID}`)
      .query(`access_token=${CONTENT_DELIVERY_ACCESS_TOKEN}&content_type=publication`)
      .end(function(err, res) {
        if (err || !res.ok) {
          console.log('error');
        } else {
          Store.entry = res.body;
          Store.loadingEntry = false;
        }
      });
  }

  @action getPage(ENTRY_ID) {
    Store.loadingPage = true;
    request
      .get(`${CONTENTFUL_BASE_URL}/spaces/${SPACE_ID}/entries/${ENTRY_ID}`)
      .query(`access_token=${CONTENT_DELIVERY_ACCESS_TOKEN}&content_type=publication`)
      .end(function(err, res) {
        if (err || !res.ok) {
          console.log('error');
        } else {
          Store.page = res.body;
          Store.loadingPage = false;
        }
      });
  }

  @action updatePublicationList() {
    Store.loadingEntry = true;
    request
      .get(`${CONTENTFUL_BASE_URL}/spaces/${SPACE_ID}/entries`)
      .query(`access_token=${CONTENT_DELIVERY_ACCESS_TOKEN}&content_type=publication`)
      .end(function(err, res) {
        if (err || !res.ok) {
          console.log('error');
        } else {
          Store.assetsList = res.body.includes.Asset;
          Store.publicationList = res.body.items;
          Store.loadingEntry = false;
        }
      });
  }

  @action updateCirculationYear(year) {
    Store.circulationYear = year;
  }
}

export default new Actions();
