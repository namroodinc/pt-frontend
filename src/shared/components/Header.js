import React from "react";
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <header>

        <div
          className="header"
        >

          <div
            className="header__logo"
          >
            Ashoor Namrood
          </div>

          <div
            className="header__navigation"
          >
            <Link
              to="/"
            >
              home
            </Link>
            <Link
              to="/work"
            >
              work
            </Link>
            <Link
              to="/about"
            >
              about
            </Link>
          </div>

        </div>

      </header>
    );
  }
}
