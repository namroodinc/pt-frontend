import React from "react";
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <header>

        <h5>
          Logo
        </h5>

        <Link
          to="/repo"
        >
          Repo
        </Link>

        <Link
          to="/edit"
        >
          Edit
        </Link>

      </header>
    );
  }
}
