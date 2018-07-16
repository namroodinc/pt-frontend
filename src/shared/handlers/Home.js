import React from "react";
import { observer } from "mobx-react";

import { Loading, NewsItem } from "../components/Index";
import { mockNewsList } from "../constants/Index";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
class Home extends React.Component {
  componentDidMount() {
    Store.reset();
    Actions.getArticles();
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    console.log(Store.retrieveArticles());

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
