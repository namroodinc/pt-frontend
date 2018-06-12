import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

import Store from "../stores/Store";

@observer
class ContentScroller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolling: false
    }
  }

  componentDidMount() {
    let isScrolling;
    const self = this;

    window.addEventListener('scroll', function (event) {
      self.setState({
        scrolling: true
      });

      window.clearTimeout(isScrolling);

      isScrolling = setTimeout(function() {
        self.setState({
          scrolling: false
        });
      }, 250);
    }, false);
  }

  render() {
    const retrievePublicationList = Store.retrievePublicationList;

    return (
      <div
        className="content-scroller"
      >

        {retrievePublicationList.map((publication, i) =>
          <div
            className="content-scroller__publication"
            key={i}
          >
            <Link
              className={this.state.scrolling ? 'scrolling-skew' : ''}
              to="/"
            >
              <h2>
                {publication.name}
              </h2>
            </Link>
          </div>
        )}

      </div>
    );
  }
}

export default ContentScroller;
