import React from "react";

import { Logo } from "./Icons/Index";

class Loading extends React.Component {
  render() {
    return (
      <div
        className="loading"
      >
        <Logo
          size={200}
        />
      </div>
    );
  }
}

export default Loading;
