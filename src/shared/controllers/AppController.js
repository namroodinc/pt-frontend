import React from "react";
import { Switch, Route } from "react-router-dom";

import {
  Header
} from "../components/Index";

import {
  AdminPublications,
  Article,
  Home,
  PageType,
  Publications,
  Reviews
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
              path="/admin/publications"
              component={AdminPublications}
            />
            <Route
              exact
              path="/article/:articleId"
              component={Article}
            />
            <Route
              exact
              path="/author/:id"
              render={(props) => <PageType {...props} type="author" />}
            />
            <Route
              exact
              path="/publications"
              component={Publications}
            />
            <Route
              exact
              path="/publication/:id"
              render={(props) => <PageType {...props} type="publication" />}
            />
            <Route
              exact
              path="/reviews"
              component={Reviews}
            />
            <Route
              exact
              path="/section/:id"
              render={(props) => <PageType {...props} type="section" />}
            />
            <Route
              exact
              path="/trend/:id"
              render={(props) => <PageType {...props} type="trend" />}
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
