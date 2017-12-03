import React from "react";
import { Switch, Route } from "react-router-dom";

import {
  Header
} from "../components/Index";

import {
  Home
} from "../handlers/Index";

export default class AppController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <Header />

        <Switch>
          <Route
            exact
            path="/"
            component={Home}
          />
          <Route
            exact
            path="/edit"
            component={Home}
          />
        </Switch>

      </div>
    )
  }
}
