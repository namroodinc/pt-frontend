import React from "react";
import { Link } from "react-router-dom";

import { Logo } from "./Icons/Index";

export default class Header extends React.Component {
  render() {
    const links = (
      <div>
        <Link
          to="/publications"
        >
          Publications
        </Link>
      </div>
    );

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
              <Logo />
            </Link>
          </div>

          <div
            className="header__navigation"
          >
            {links}
          </div>

        </div>
      </header>
    );
  }
}
