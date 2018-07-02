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
        {mockNewsList.map((newsItem, i) => {
          const { title, time, trends } = newsItem;

          return (
            <NewsItem
              key={i}
              title={title}
              time={time}
              trends={trends}
            />
          )
        })}

      </div>
    )
  }
}

export default Home;
