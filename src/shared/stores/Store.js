import { observable, autorun } from "mobx";

class Store {
  @observable entry = {
    showExperience: '',
    showPortfolio: '',
    showSkills: '',
    text: '',
    title: ''
  };
  @observable assetsList = [];
  @observable portfolioList = [];

  retrieveEntry() {
    return this.entry;
  }

  retrieveAssetsList() {
    return this.assetsList;
  }

  retrievePortfolioList() {
    return this.portfolioList;
  }
}

let store = new Store();
export default store;

autorun(() => {
  // Uncomment below this to see how autorun in action: https://mobx.js.org/refguide/autorun.html
  // const { portfolioList } = store;
  // console.log(portfolioList);
});
