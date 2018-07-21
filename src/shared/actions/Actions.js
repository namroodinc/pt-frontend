import { action } from "mobx";
import request from "superagent";

import Store from "../stores/Store";

class Actions {
  @action getArticles(loading = true) {
    Store.loading = loading;

    request
      .post(`/api/search/articles`)
      .set('X-CORS-TOKEN', process.env['API_KEY'])
      .set('Content-Type', 'application/json')
      .send({
        page: Store.retrieveCurrentPageNumber()
      })
      .end(function (err, res) {
        Store.loading = false;

        if (err) {
          console.log(err);
        } else if (res) {
          Store.articles.push(...res.body.results);
        }
      });
  }
}

export default new Actions();
