import { action } from "mobx";
import request from "superagent";

import Store from "../stores/Store";
import { CONTENTFUL_BASE_URL, CONTENT_DELIVERY_ACCESS_TOKEN, SPACE_ID } from "../utils/config";

class Actions {
  @action updateEntry(ENTRY_ID) {
    Store.loading = true;
    request
      .get(`${CONTENTFUL_BASE_URL}/spaces/${SPACE_ID}/entries/${ENTRY_ID}`)
      .query(`access_token=${CONTENT_DELIVERY_ACCESS_TOKEN}&content_type=publication`)
      .end(function(err, res) {
        if (err || !res.ok) {
          console.log('error');
        } else {
          Store.entry = res.body.fields;
          Store.loading = false;
        }
      });
  }

  @action updatePublicationList() {
    request
      .get(`${CONTENTFUL_BASE_URL}/spaces/${SPACE_ID}/entries`)
      .query(`access_token=${CONTENT_DELIVERY_ACCESS_TOKEN}&content_type=publication`)
      .end(function(err, res) {
        if (err || !res.ok) {
          console.log('error');
        } else {
          Store.publicationList = res.body.items;
        }
      });
  }
}

export default new Actions();
