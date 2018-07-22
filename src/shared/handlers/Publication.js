import React from "react";
import { observer } from "mobx-react";

import { Loading } from "../components/Index";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
class Publication extends React.Component {
  componentDidMount() {
    Actions.getPublication(this.props.match.params.publicationId);
  }

  componentWillUnmount() {
    // Store.reset();
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const publication = Store.retrievePublication();
    const { avatarUrlToImage, backgroundColor, country, headquarters, name, twitterScreenName, url } = publication;

    return (
      <div
        className="container"
      >
        <div
          className="container container--publication"
        >
          <h1>
            {name}
          </h1>

          <h5>
            <a
              href={`https://www.${url}`}
              target="_blank"
            >
              {url}
            </a>
          </h5>

          <hr />

          <div
            className="publication"
          >

            <div
              className="publication__avatar"
            >
              <div
                className="circle-button circle-button--extra-large"
                style={{
                  backgroundColor
                }}
              >
                {avatarUrlToImage &&
                  <img
                    src={avatarUrlToImage}
                  />
                }
              </div>
            </div>

            <div
              className="publication__details"
            >
              <table>
                <tbody>
                  <tr>
                    <td>
                      Country
                    </td>
                    <td>
                      {country}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Headquarters
                    </td>
                    <td>
                      {headquarters}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Twitter
                    </td>
                    <td>
                      <a
                        href={`http://twitter.com/${twitterScreenName}`}
                        target="_blank"
                      >
                        @{twitterScreenName}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>
    )
  }
}

export default Publication;
