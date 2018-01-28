import React from "react";
import { Switch, Route } from "react-router-dom";

import { Header } from "../components/Index";
import { Circulations, Page, Publication } from "../handlers/Index";

export default class AppController extends React.Component {
  render() {
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
            path="/publication"
            component={Page}
          />
          <Route
            exact
            path="/circulations/:entryId"
            component={Circulations}
          />
          <Route
            exact
            path="/publication/:entryId"
            component={Publication}
          />
        </Switch>

      </div>
    )
  }
}
