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
              PRESS TORCH
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
              to="/ratings"
            >
              Ratings
            </Link>
            <Link
              to="/circulations"
            >
              Circulations
            </Link>
          </div>

        </div>

      </header>
    );
  }
}
