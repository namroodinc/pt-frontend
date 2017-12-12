import React from "react";
import { Link } from 'react-router-dom';

import {
  Logo
} from "./Icons/Index";

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
              <Logo
                size={25}
              />
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
              to="/portfolio"
            >
              Portfolio
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
