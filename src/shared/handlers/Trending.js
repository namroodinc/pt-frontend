import React from "react";
import { observer } from "mobx-react";
import moment from "moment";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import {
  Banner,
  Loading
} from "../components/Index";

@observer
class Trending extends React.Component {
  componentWillMount() {
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
                    {trend.tags.map((tag, i) =>
                      <td
                        key={i}
                      >
                        {moment(tag.timestamp).format('MMM DD YYYY')}

                        <ul>
                          {tag.trends.map((trend, i) =>
                            <li
                              key={i}
                            >
                              {trend.trend} ({trend.count})
                            </li>
                          )}
                        </ul>
                      </td>
                    )}
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
