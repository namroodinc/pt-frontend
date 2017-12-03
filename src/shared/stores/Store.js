import { observable, autorun } from "mobx";

class DataStore {
  @observable pageTitle = 'About Page';

  retrievePageTitle() {
    return this.pageTitle;
  }
}

let store = new DataStore;
export default store;

autorun(() => {
  // Uncomment below this to see how autorun in action: https://mobx.js.org/refguide/autorun.html
  // const { pageTitle } = store;
  // console.log(pageTitle);
});
