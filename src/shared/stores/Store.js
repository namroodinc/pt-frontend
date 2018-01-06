import { observable, autorun } from "mobx";

class Store {
  @observable entry = {};
  @observable assetsList = [];
  @observable publicationList = [];

  retrieveEntry() {
    return this.entry;
  }

  retrieveAssetsList() {
    return this.assetsList;
  }

  retrievePublicationList() {
    return this.publicationList;
  }
}

let store = new Store();
export default store;

autorun(() => {
  // Uncomment below this to see how autorun in action: https://mobx.js.org/refguide/autorun.html
  // const { publicationList } = store;
  // console.log(publicationList);
});
