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

  @action setSearchTerm(searchTerm) {
    Store.searchTerm = searchTerm;
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
        }
      });
  }

  @action getPublication(publicationId) {
    Store.loading = true;

    request
      .post(`/api/retrieve/publication/${publicationId}`)
      .send({})
      .end(function (err, res) {
        Store.loading = false;

        if (err) {
          console.log(err);
        } else if (res) {
          Store.publication = res.body;
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
          Store.reviews = res.body;
        }
      });
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

  @action getTrend(trendId) {
    Store.loading = true;

    request
      .post(`/api/retrieve/trend/${trendId}`)
      .send({})
      .end(function (err, res) {
        Store.loading = false;

        if (err) {
          console.log(err);
        } else if (res) {
          Store.trend = res.body;
        }
      });
  }
}

export default new Actions();
