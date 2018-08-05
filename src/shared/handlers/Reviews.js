import React from "react";
import { observer } from "mobx-react";

import { Loading } from "../components/Index";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
class Reviews extends React.Component {
  componentDidMount() {
    Actions.getReviews();
  }

  componentWillUnmount() {
    // Store.reset();
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const reviews = Store.retrieveReviews();

    return (
      <div
        className="container"
      >
        <h1>
          Reviews
        </h1>

        <div
          className="reviews"
        >
          <hr />
          {reviews.map((review, i) =>
            <div
              className="reviews__item"
              key={i}
            >
              {review.message}
              <hr />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Reviews;
