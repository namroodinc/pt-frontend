import React from "react";
import { Switch, Route } from "react-router-dom";

import {
  Header
} from "../components/Index";

import {
  Page
} from "../handlers/Index";

const PAGE_HOME_ENTRY_ID = process.env.PAGE_HOME_ENTRY_ID;
const PAGE_ABOUT_ENTRY_ID = process.env.PAGE_ABOUT_ENTRY_ID;

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
            path="/work"
            component={Page}
          />
        </Switch>

      </div>
    )
  }
}
