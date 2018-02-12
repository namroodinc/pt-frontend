import React from "react";

export default class Group extends React.Component {
  render() {
    const { inputRef } = this.props;

    return (
      <g
        ref={inputRef}
      >
        {this.props.children}
      </g>
    );
  }
}
