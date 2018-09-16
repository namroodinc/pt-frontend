import { action, autorun, extendObservable } from "mobx";

class Store {
  constructor() {
    this.reset();
  }

  @action reset() {
    extendObservable(this, {
      author: {},
      articles: [],
      article: {},
      currentPageNumber: 0,
      ideologies: [],
      loading: true,
      publication: {},
      publications: [],
      reviews: [],
      reviewLoading: false,
      searchTerm: '',
      section: {},
      snackbar: {
        message: '',
        open: false
      },
      trend: {},
      trends: []
    });
  }

  isLoading() {
    return this.loading;
  }

  isReviewLoading() {
    return this.reviewLoading;
  }

  retrieveArticle() {
    return this.article;
  }

  retrieveArticles() {
    return this.articles;
  }

  retrieveCurrentPageNumber() {
    return this.currentPageNumber;
  }

  retrieveIdeologies() {
    return this.ideologies;
  }

  retrievePageType(type) {
    return this[type];
  }

  retrievePublications() {
    return this.publications;
  }

  retrieveReviews() {
    return this.reviews;
  }

  retrieveSearchTerm() {
    return this.searchTerm;
  }

  retrieveSnackbar() {
    return this.snackbar;
  }

  retrieveTrends() {
    return this.trends;
  }
}

let store = new Store();
export default store;

autorun(() => {
  // Uncomment below this to see how autorun in action: https://mobx.js.org/refguide/autorun.html
  // const { loading } = store;
  // console.log(loading);
});
