import React from "react";
import { Switch, Route } from "react-router-dom";

import { Header } from "../components/Index";
import {
  AlexaRanking,
  Analytics,
  Circulations,
  Complaints,
  Home,
  Page,
  Prices,
  Publication,
  Ratings
} from "../handlers/Index";
import {
  ALEXA_ENTRY_ID,
  CIRCULATIONS_ENTRY_ID,
  PRESS_COMPLAINTS_ID,
  PRICES_ENTRY_ID,
  RATINGS_ENTRY_ID
} from "../utils/config";

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
              path="/publication"
              component={Page}
            />
            <Route
              exact
              path="/alexa"
              component={AlexaRanking}
            />
            <Route
              exact
              path="/ratings"
              component={() => <Ratings pageId={RATINGS_ENTRY_ID} />}
            />
            <Route
              exact
              path="/complaints"
              component={() => <Complaints pageId={PRESS_COMPLAINTS_ID} />}
            />
            <Route
              exact
              path="/analytics"
              component={() => <Analytics pageId={ALEXA_ENTRY_ID} />}
            />
            <Route
              exact
              path="/prices"
              component={() => <Prices pageId={PRICES_ENTRY_ID} />}
            />
            <Route
              exact
              path="/circulations"
              component={() => <Circulations pageId={CIRCULATIONS_ENTRY_ID} />}
            />
            <Route
              exact
              path="/publication/:entryId"
              component={Publication}
            />
          </Switch>
        </div>

        <footer>
          Press Torch.
        </footer>
      </div>
    )
  }
}
