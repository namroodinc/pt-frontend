import React from "react";
import { observer } from 'mobx-react';
import PropTypes from "prop-types";
import { Grid, Paper } from "material-ui";
import Tabs, { Tab } from "material-ui/Tabs";
import ReactHtmlParser from "react-html-parser";
import Marked from "marked";

import Actions from "../actions/Actions";
import Store from "../stores/Store";
import { Asset, Loading, Rating } from "../components/Index";
import { Timeline } from "../components/Data/Index";
import { Latest, News } from "../components/Icons/Index";

@observer
class Publication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  componentWillMount() {
    Actions.getEntry(this.props.match.params.entryId);
  }

  handleChange = (event, value) => {
    this.setState({
      value
    });
  };

  render() {
    if (Store.isLoading()) return <Loading />;

    const {
      articles,
      avatar,
      description,
      disambiguation,
      independentPressStandardsOrganisation,
      ipsoList,
      overallRating,
      name,
      siteRankings,
      twitterAccounts
    } = Store.retrieveEntry();

    const assets = Store.retrieveAssetsList();
    const asset = assets.find(asset => asset.sys.id === avatar.sys.id);
    const backgroundColor = twitterAccounts[0].backgroundColor;
    const publicationDescription = description || '';
    const ipsoListJoin = ipsoList.map(item => item.id).join(',');

    const timeline = [
      ...articles,
      ...[independentPressStandardsOrganisation],
      ...overallRating,
      ...siteRankings
    ];

    return (
      <div>

        <div
          className="container"
        >

          <Grid
            container
            spacing={24}
          >

            <Grid
              item
              xs={12}
            >
              <Paper>
                <Asset
                  asset={asset.fields.file.url}
                  title={name}
                />

                <h2>
                  {name}
                </h2>

                <h5>
                  {disambiguation}
                </h5>

                {ReactHtmlParser(Marked(publicationDescription))}

                <Rating
                  rating={overallRating}
                />
              </Paper>
            </Grid>

          </Grid>

          <Grid
            container
            spacing={24}
          >

            <Grid
              item
              xs={12}
            >

              <Paper>
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab
                    icon={<span>
                      <Latest />
                    </span>}
                    label="Latest"
                  />
                  <Tab
                    icon={<span>
                      <News />
                    </span>}
                    label="About"
                  />
                </Tabs>
              </Paper>

              <Paper>
                <Timeline
                  backgroundColor={backgroundColor}
                  data={timeline}
                  ipsoList={ipsoListJoin}
                  title="Latest"
                />
              </Paper>

            </Grid>

          </Grid>

        </div>

      </div>
    )
  }
}

Publication.propTypes = {
  match: PropTypes.object
};

export default Publication;
