import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

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
    const {
      avatarUrlToImage,
      backgroundColor,
      ideology,
      name,
      url
    } = publication;

    return (
      <div
        className="container container--publication"
      >

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

          <h3>
            {name}
          </h3>

          <h5>
            <a
              href={`https://www.${url}`}
              target="_blank"
            >
              {url}
            </a>
          </h5>

          <div
            className="publication__ideologies"
          >
            {ideology !== undefined &&
              <div>
                {ideology.length > 0 &&
                  <div>
                    {ideology.map((item, i) =>
                      <Link
                        key={i}
                        to={`/ideology/${item._id}`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                }
              </div>
            }
          </div>

        </div>

      </div>
    )
  }
}

export default Publication;
