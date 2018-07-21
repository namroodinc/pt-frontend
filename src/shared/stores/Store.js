import { action, autorun, extendObservable } from "mobx";

class Store {
  constructor() {
    this.reset();
  }

  @action reset() {
    extendObservable(this, {
      articles: [],
      currentPageNumber: 0,
      loading: false,
      searchTerm: ''
    });
  }

  isLoading() {
    return this.loading;
  }

  retrieveArticles() {
    return this.articles;
  }

  retrieveCurrentPageNumber() {
    return this.currentPageNumber;
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
