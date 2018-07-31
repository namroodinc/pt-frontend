import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import 'draft-js/dist/Draft.css';

import CustomMaterialUITheme from "./theme/material.ui.config";
import App from "../shared/controllers/AppController";
import "./styles/app";

const theme = createMuiTheme(CustomMaterialUITheme);

if (module.hot) {
  module.hot.accept();
}

ReactDOM.hydrate(
  <MuiThemeProvider
    theme={theme}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById("react-app")
);
