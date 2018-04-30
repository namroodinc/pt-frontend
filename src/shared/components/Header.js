import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    const links = (
      <div>
        <Link
          to="/"
        >
          Home
        </Link>
        <Link
          to="/data"
        >
          Data
        </Link>
        <Link
          to="/complaints"
        >
          Complaints
        </Link>
        <Link
          to="/prices"
        >
          Prices
        </Link>
        <Link
          to="/circulations"
        >
          Circulations
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
              Press Torch
            </Link>
          </div>

          <div
            className="header__navigation"
          >
            {links}
          </div>

        </div>

        <div
          className="sub-header"
        >
          <div
            className="sub-header__navigation"
          >
            {links}
          </div>
        </div>
      </header>
    );
  }
}
