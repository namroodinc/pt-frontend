import React from "react";
import { Switch, Route } from "react-router-dom";

import {
  Header
} from "../components/Index";

import {
  Home,
  Page,
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
              path="/page"
              component={Page}
            />
            <Route
              exact
              path="/page/:pageId"
              component={Page}
            />
            <Route
              exact
              path="/publications"
              component={Publications}
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
