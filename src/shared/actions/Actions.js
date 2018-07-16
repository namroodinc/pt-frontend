import { action } from "mobx";
import request from "superagent";

import Store from "../stores/Store";

class Actions {
  @action getArticles() {
    Store.loading = true;

    request
      .post(`/api/search/articles`)
      .set('X-CORS-TOKEN', process.env['API_KEY'])
      .set('Content-Type', 'application/json')
      .send({
        'searchTerm': 'donald'
      })
      .then(function (err, res) {
        Store.loading = false;

        if (err) {
          console.log({
            status: 500,
            text: err.message
          });
        } else if (res.ok) {
          console.log(res);
        }
      });
  }
}

export default new Actions();
