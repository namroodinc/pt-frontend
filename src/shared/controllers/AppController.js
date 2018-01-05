import React from "react";
import { Switch, Route } from "react-router-dom";

import { Header } from "../components/Index";
import { Page } from "../handlers/Index";

export default class AppController extends React.Component {
  render() {
    // component={() => <Page entryId={PAGE_HOME_ENTRY_ID} />}

    return (
      <div>

        <Header />

        <Switch>
          <Route
            exact
            path="/"
            component={Page}
          />
          <Route
            exact
            path="/about"
            component={Page}
          />
          <Route
            exact
            path="/portfolio"
            component={Page}
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
