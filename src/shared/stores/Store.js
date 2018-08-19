import { action, autorun, extendObservable } from "mobx";

class Store {
  constructor() {
    this.reset();
  }

  @action reset() {
    extendObservable(this, {
      articles: [],
      article: {},
      currentPageNumber: 0,
      loading: true,
      publication: {},
      publications: [],
      reviews: [],
      reviewLoading: false,
      searchTerm: '',
      section: {},
      trend: {}
    });
  }

  isLoading() {
    return this.loading;
  }

  retrieveArticles() {
    return this.articles;
  }

  retrieveArticle() {
    return this.article;
  }

  retrieveCurrentPageNumber() {
    return this.currentPageNumber;
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

  isReviewLoading() {
    return this.reviewLoading;
  }

  retrieveSearchTerm() {
    return this.searchTerm;
  }
}

let store = new Store();
export default store;

autorun(() => {
  // Uncomment below this to see how autorun in action: https://mobx.js.org/refguide/autorun.html
  // const { loading } = store;
  // console.log(loading);
});
