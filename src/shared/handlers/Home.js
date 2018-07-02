import React from "react";
import { observer } from "mobx-react";

import { NewsItem } from "../components/Index";
import { mockNewsList } from "../constants/Index";

// import Store from "../stores/Store";

@observer
class Home extends React.Component {
  componentWillMount() {
  }

  render() {
    // if (Store.isLoading()) return <Loading />;

    return (
      <div
        className="container"
      >
        {mockNewsList.map((newsItem, i) =>
          <NewsItem
            key={i}
            title={newsItem.title}
            trends={newsItem.trends}
          />
        )}

      </div>
    )
  }
}

export default Home;
