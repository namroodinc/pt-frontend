import React from "react";
import { observer } from "mobx-react";

import { Loading, NewsItem } from "../components/Index";

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

    const articles = Store.retrieveArticles();

    return (
      <div
        className="container"
      >
        {articles.map((article, i) => {
          const { authors, description, title, trends } = article;

          return (
            <NewsItem
              authors={authors}
              description={description}
              key={i}
              title={title}
              trends={trends}
            />
          )
        })}

      </div>
    )
  }
}

export default Home;
