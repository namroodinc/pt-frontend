import React from "react";
import { observer } from "mobx-react";
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

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

        <Grid
          container
          spacing={24}
        >
          <Grid
            item
            xs={3}
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
                className="publication__details"
              >
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <Tooltip
                          title="Country"
                        >
                          <Icon>
                            public
                          </Icon>
                        </Tooltip>
                      </td>
                      <td>
                        {country}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Tooltip
                          title="Headquarters"
                        >
                          <Icon>
                            domain
                          </Icon>
                        </Tooltip>
                      </td>
                      <td>
                        {headquarters}
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                      >
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
          </Grid>
          <Grid
            item
            xs={6}
          >
            asdasd
          </Grid>
        </Grid>

      </div>
    )
  }
}

export default Publication;
