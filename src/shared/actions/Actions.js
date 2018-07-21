import { action } from "mobx";
import request from "superagent";

import Store from "../stores/Store";

class Actions {
  @action getArticles(loading = true, reset = false) {
    Store.loading = loading;
    if (reset) {
      Store.articles = [];
      Store.currentPageNumber = 0;
    }

    request
      .post(`/api/search/articles`)
      .set('X-CORS-TOKEN', process.env['API_KEY'])
      .set('Content-Type', 'application/json')
      .send({
        searchTerm: Store.retrieveSearchTerm(),
        page: Store.retrieveCurrentPageNumber()
      })
      .end(function (err, res) {
        Store.loading = false;

        if (err) {
          console.log(err);
        } else if (res) {
          Store.articles.push(...res.body.results);
          Store.currentPageNumber = res.body.page + 1;
        }
      });
  }

  @action setSearchTerm(searchTerm) {
    Store.searchTerm = searchTerm;
  }

  @action getPublications() {
    Store.loading = true;

    request
      .post(`/api/search/publications`)
      .set('X-CORS-TOKEN', process.env['API_KEY'])
      .set('Content-Type', 'application/json')
      .send({})
      .end(function (err, res) {
        Store.loading = false;

        if (err) {
          console.log(err);
        } else if (res) {
          Store.publications = res.body.results;
        }
      });
  }
}

export default new Actions();
