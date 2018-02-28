import { action } from "mobx";
import request from "superagent";

import Store from "../stores/Store";
import { CONTENTFUL_BASE_URL, CONTENT_DELIVERY_ACCESS_TOKEN, SPACE_ID } from "../utils/config";

class Actions {
  @action getEntry(ENTRY_ID) {
    Store.loading = true;
    request
      .get(`${CONTENTFUL_BASE_URL}/spaces/${SPACE_ID}/entries/${ENTRY_ID}`)
      .query(`access_token=${CONTENT_DELIVERY_ACCESS_TOKEN}&content_type=publication`)
      .end(function(err, res) {
        if (err || !res.ok) {
          console.log('error');
        } else {
          Store.entry = res.body;
          Store.loading = false;
        }
      });
  }

  @action getPage(ENTRY_ID) {
    Store.loading = true;
    request
      .get(`${CONTENTFUL_BASE_URL}/spaces/${SPACE_ID}/entries/${ENTRY_ID}`)
      .query(`access_token=${CONTENT_DELIVERY_ACCESS_TOKEN}&content_type=page`)
      .end(function(err, res) {
        if (err || !res.ok) {
          console.log('error');
        } else {
          Store.page = res.body;
          Store.loading = false;
        }
      });
  }

  @action getPageWithPublicationList(ENTRY_ID) {
    Store.loading = true;

    const getPage = new Promise((resolve, reject) => {
      request
        .get(`${CONTENTFUL_BASE_URL}/spaces/${SPACE_ID}/entries/${ENTRY_ID}`)
        .query(`access_token=${CONTENT_DELIVERY_ACCESS_TOKEN}&content_type=page`)
        .end(function(err, res) {
          if (err || !res.ok) {
            reject(err);
          } else {
            resolve(res.body);
          }
        });
    });

    const getPublicationList = new Promise((resolve, reject) => {
      request
        .get(`${CONTENTFUL_BASE_URL}/spaces/${SPACE_ID}/entries`)
        .query(`access_token=${CONTENT_DELIVERY_ACCESS_TOKEN}&content_type=publication`)
        .end(function(err, res) {
          if (err || !res.ok) {
            reject(err);
          } else {
            resolve(res.body);
          }
        });
    });

    return Promise.all([getPage, getPublicationList]).then(values => {
      Store.page = values[0];
      Store.assetsList = values[1].includes.Asset;
      Store.publicationList = values[1].items;
      Store.loading = false;
    });
  }

  @action updatePublicationList() {
    Store.loading = true;
    request
      .get(`${CONTENTFUL_BASE_URL}/spaces/${SPACE_ID}/entries`)
      .query(`access_token=${CONTENT_DELIVERY_ACCESS_TOKEN}&content_type=publication`)
      .end(function(err, res) {
        if (err || !res.ok) {
          console.log('error');
        } else {
          Store.assetsList = res.body.includes.Asset;
          Store.publicationList = res.body.items;
          Store.loading = false;
        }
      });
  }

  @action updateCirculationYear(year) {
    Store.circulationYear = year;
  }
}

export default new Actions();
