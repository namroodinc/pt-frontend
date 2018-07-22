import React from "react";
import { Switch, Route } from "react-router-dom";

import {
  Header
} from "../components/Index";

import {
  Home,
  Publication,
  Publications
} from "../handlers/Index";

export default class AppController extends React.Component {
  render() {
    return (
      <div>
        <div
          className="wrapper"
        >
          <Header />

          <Switch>
            <Route
              exact
              path="/"
              component={Home}
            />
            <Route
              exact
              path="/publications"
              component={Publications}
            />
            <Route
              exact
              path="/publication/:publicationId"
              component={Publication}
            />
          </Switch>
        </div>

        <footer>
          pt
        </footer>
      </div>
    )
  }
}
