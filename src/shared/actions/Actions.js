import { action } from "mobx";

import Store from "../stores/Store";

class Actions {
  @action getValue(value) {
    Store.loading = true;
    Store.value = value;
  }
}

export default new Actions();
