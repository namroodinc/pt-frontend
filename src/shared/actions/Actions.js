import { action } from 'mobx';
import store from '../stores/Store';

class DataActions {
  constructor() {
  }

  @action updatePageTitle(text) {
    store.pageTitle = text;
  }
}

export default new DataActions;
