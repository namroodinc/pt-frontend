import React from "react";
import { Link } from "react-router-dom";

export default class HeaderStylish extends React.Component {
  render() {
    return (
      <header>

        <div
          className="header"
        >

          <div
            className="header__logo"
          >
            <Link
              to="/"
            >
              Press Torch
            </Link>
          </div>

        </div>

      </header>
    );
  }
}
