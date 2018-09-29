import React from "react";
import { Link } from "react-router-dom";

import { Logo } from "./Icons/Index";

export default class Header extends React.Component {
  render() {
    const isEditMode = process.env.MODE === 'edit';

    const links = (
      <div>
        <Link
          to={isEditMode ? '/admin/publications' : '/publications'}
        >
          Publications
        </Link>
        {isEditMode &&
          <Link
            to="/admin/ideologies"
          >
            Ideologies
          </Link>
        }
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
              <Logo
                size={50}
              />
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
