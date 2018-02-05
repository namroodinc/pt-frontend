import React from "react";
import { observer } from 'mobx-react';
import PropTypes from "prop-types";
import { Grid, Paper } from "material-ui";
import Tabs, { Tab } from "material-ui/Tabs";
import ReactHtmlParser from "react-html-parser";
import Marked from "marked";

import Actions from "../actions/Actions";
import Store from "../stores/Store";
import { Loading, Rating } from "../components/Index";
import { Time, Timeline } from "../components/Data/Index";
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
      fields,
      sys
    } = Store.retrieveEntry();

    console.log(fields);

    const {
      articles,
      description,
      independentPressStandardsOrganisation,
      ipsoList,
      overallRating,
      name,
      siteRankings,
      twitterAccounts
    } = fields;

    const {
      updatedAt
    } = sys;

    // const assets = Store.retrieveAssetsList();
    // const asset = assets.find(asset => asset.sys.id === avatar.sys.id);
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
              md={6}
            >
              <Paper>
                <Time
                  dateTime={updatedAt}
                  dateTimeFormat="[Last updated] MMM. DD, HH:mm"
                />

                <h2>
                  {name}
                </h2>

                <Rating
                  rating={overallRating}
                />

                {ReactHtmlParser(Marked(publicationDescription))}
              </Paper>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
            >
              <Paper>
                asd
              </Paper>
            </Grid>

            <Grid
              item
              xs={12}
              md={2}
            >
              <Paper>
                asd
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
