import React from "react";
import { Switch, Route } from "react-router-dom";

import { Header } from "../components/Index";
import { Page } from "../handlers/Index";
import { PAGE_HOME_ENTRY_ID, PAGE_ABOUT_ENTRY_ID, PAGE_PORTFOLIO_ENTRY_ID } from "../utils/config";

export default class AppController extends React.Component {
  render() {
    return (
      <div>

        <Header />

        <Switch>
          <Route
            exact
            path="/"
            component={() => <Page entryId={PAGE_HOME_ENTRY_ID} />}
          />
          <Route
            exact
            path="/about"
            component={() => <Page entryId={PAGE_ABOUT_ENTRY_ID} />}
          />
          <Route
            exact
            path="/portfolio"
            component={() => <Page entryId={PAGE_PORTFOLIO_ENTRY_ID} />}
          />
          <Route
            exact
            path="/portfolio/:id"
            component={Page}
          />
        </Switch>

      </div>
    )
  }
}
