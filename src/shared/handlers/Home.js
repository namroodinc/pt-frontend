import React from "react";

import {
  PortfolioList
} from "../components/Index";

export default class Home extends React.Component {
  render() {
    return (
      <div
        className="container"
      >

        <PortfolioList />

      </div>
    )
  }
}
