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
            <Link
              to="/"
            >
              PV
            </Link>
          </div>

          <div
            className="header__navigation"
          >
            <Link
              to="/"
            >
              Home
            </Link>
            <Link
              to="/publications"
            >
              Publications
            </Link>
            <Link
              to="/about"
            >
              About
            </Link>
          </div>

        </div>

      </header>
    );
  }
}
