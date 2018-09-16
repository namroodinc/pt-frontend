import React from "react";
import { observer } from "mobx-react";
import Snackbar from "@material-ui/core/Snackbar";
import { Switch, Route } from "react-router-dom";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

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

@observer
export default class AppController extends React.Component {
  handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    Actions.isSnackbarOpen(false);
  };

  render() {
    const snackbar = Store.retrieveSnackbar();

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

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={
            <span>
              {snackbar.message}
            </span>
          }
        />
      </div>
    )
  }
}
