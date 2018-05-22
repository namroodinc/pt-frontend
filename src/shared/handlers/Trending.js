import React from "react";
import { observer } from "mobx-react";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import {
  Banner,
  Loading
} from "../components/Index";

@observer
class Trending extends React.Component {
  componentDidMount() {
    Actions.updatePublicationList();
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const trends = Store.getTrendsForLast7Days;

    const title = "Trending";
    const bodyCopy = "Blurb about Trending *goes here*";

    return (
      <div
        className="container"
      >

        <div
          className="container__narrow"
        >
          <Banner
            title={title}
            description={bodyCopy}
          />
        </div>

        <div
          className="container"
        >
          {trends.map((trend, i) =>
            <div
              key={i}
            >
              <h3>
                {trend.name}
              </h3>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <ul>
                        {trend.tags.map((tag, i) =>
                          <li
                            key={i}
                          >
                            {tag.trend} ({tag.count})
                          </li>
                        )}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
            </div>
          )}
        </div>

      </div>
    )
  }
}

export default Trending;
