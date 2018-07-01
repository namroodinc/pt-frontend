import { autorun, observable } from "mobx";

class Store {
  @observable loading = true;
  @observable value = '2018';

  isLoading() {
    return this.loading;
  }

  retrieveValue() {
    return this.value;
  }
}

let store = new Store();
export default store;

autorun(() => {
  // Uncomment below this to see how autorun in action: https://mobx.js.org/refguide/autorun.html
  const { value } = store;
  console.log(value);
});
