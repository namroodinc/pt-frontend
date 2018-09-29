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
      .send({
        limit: true,
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

  @action getArticle(articleId) {
    Store.loading = true;

    request
      .post(`/api/retrieve/article/${articleId}`)
      .send({})
      .end(function (err, res) {
        Store.loading = false;

        if (err) {
          console.log(err);
        } else if (res) {
          Store.article = res.body;
        }
      });
  }

  @action getIdeologies() {
    request
      .post(`/api/search/ideologies`)
      .send({})
      .end(function (err, res) {
        Store.loading = false;

        if (err) {
          console.log(err);
        } else if (res) {
          Store.ideologies = res.body;
          Store.snackbar = {
            message: 'Ideologies listed',
            open: true
          };
        }
      });
  }

  @action getPageType(type, pageTypeId) {
    Store.articles = [];
    Store.loading = true;
    Store[type] = {};

    request
      .post(`/api/retrieve/${type}/${pageTypeId}`)
      .send({})
      .end(function (err, res) {
        Store.loading = false;

        if (err) {
          console.log(err);
        } else if (res) {
          Store.articles = res.body.results;
          Store[type] = res.body.page;
        }
      });
  }

  @action getPublications() {
    Store.loading = true;

    request
      .post(`/api/search/publications`)
      .send({
        'newsApiIdOrNot': true
      })
      .end(function (err, res) {
        Store.loading = false;

        if (err) {
          console.log(err);
        } else if (res) {
          Store.publications = res.body.results;
          Store.snackbar = {
            message: 'Publication\'s listed',
            open: true
          };
        }
      });
  }

  @action getReviews() {
    Store.loading = true;

    request
      .post(`/api/search/reviews`)
      .send({})
      .end(function (err, res) {
        Store.loading = false;

        if (err) {
          console.log(err);
        } else if (res) {
          Store.loading = false;
          Store.reviews = res.body;
        }
      });
  }

  @action getTrends() {
    request
      .post(`/api/retrieve/trends`)
      .send({})
      .end(function (err, res) {
        Store.loading = false;

        if (err) {
          console.log(err);
        } else if (res) {
          Store.trends = res.body.trends;
        }
      });
  }

  @action isSnackbarOpen(isOpen) {
    Store.snackbar.open = isOpen;
  }

  @action postReview(articleId, message) {
    Store.reviewLoading = true;

    request
      .post(`/api/create/review`)
      .send({
        articleId,
        message
      })
      .end(function (err, res) {
        Store.reviewLoading = false;

        if (err) {
          console.log(err);
        } else if (res) {
          console.log(res.body);
        }
      });
  }

  @action setSearchTerm(searchTerm) {
    Store.searchTerm = searchTerm;
  }

  @action updateIdeology(id, body) {
    request
      .post(`/api/update/ideology/${id}`)
      .send(body)
      .end(function (err, res) {
        if (err) {
          console.log(err);
        } else if (res) {
          Store.snackbar = {
            message: res.body.message,
            open: true
          };
        }
      });
  }

  @action updatePublication(body) {
    request
      .post(`/api/create/publication`)
      .send(body)
      .end(function (err, res) {
        if (err) {
          console.log(err);
        } else if (res) {
          Store.snackbar = {
            message: res.body.message,
            open: true
          };
        }
      });
  }
}

export default new Actions();
