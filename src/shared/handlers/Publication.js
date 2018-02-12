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
// import { Line } from "../components/Charts/Index";
import { PaperCard, Time, Timeline } from "../components/Data/Index"; //Table,
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

    const {
      articles,
      description,
      format,
      founded,
      geocodeAddress,
      independentPressStandardsOrganisation,
      ipsoList,
      overallRating,
      ownership,
      politicalAlignment,
      // pressComplaints,
      publicationPrice,
      publisher,
      name,
      siteRankings,
      twitterAccounts,
      website
    } = fields;

    const {
      updatedAt
    } = sys;

    const currencySymbol = {
      AUD: '$',
      GBP: '£',
      USD: '$'
    }

    // const assets = Store.retrieveAssetsList();
    // const asset = assets.find(asset => asset.sys.id === avatar.sys.id);
    const backgroundColor = twitterAccounts[0].backgroundColor;
    const publicationDescription = description || '';
    const ipsoListJoin = ipsoList.map(item => item.id).join(',');

    const address = geocodeAddress.address_components.map(address => address.long_name);
    const alexa = siteRankings[siteRankings.length - 1];
    const alexaRank = alexa.data.globalRank;
    const alexaLastUpdated = alexa.timestamp;
    const alignment = politicalAlignment.join(', ');
    const formats = format.join(', ');
    const foundedDate = founded.split(';')[0];
    const price = publicationPrice[publicationPrice.length - 1];
    const { currency } = price;
    const prices = price.data.map(price => {
      const actualPrice = price.price === 0 ? 'Free' : `${currencySymbol[currency]}${price.price.toFixed(2)}`;
      return `${price.name}, ${actualPrice}`;
    });
    const priceLastUpdated = price.timestamp;

    // const complaints = [
    //   ...pressComplaints,
    //   ...independentPressStandardsOrganisation
    // ];

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
                  dateTimeFormat="[Last updated:] MMM. DD, HH:mm"
                />

                <h2>
                  {name}
                </h2>

                <Rating
                  rating={overallRating}
                />

                {ReactHtmlParser(Marked(publicationDescription))}
              </Paper>

              <PaperCard
                title="Website"
                text={
                  <a
                    href={`${website}`}
                    target="_blank"
                  >
                    {website}
                  </a>
                }
              />

              <PaperCard
                title={`Publication Price(s) in ${currency}`}
                list={prices}
              >
                <Time
                  dateTime={priceLastUpdated}
                  dateTimeFormat="[Updated:] MMM. DD, HH:mm"
                />
              </PaperCard>

            </Grid>

            <Grid
              container
              item
              xs={12}
              md={6}
              spacing={24}
            >

              <Grid
                item
                xs={12}
                md={6}
              >

                <PaperCard
                  title="Political alignment and opinion"
                  text={alignment}
                />

                <PaperCard
                  title="Format"
                  text={formats}
                />

                <PaperCard
                  title="Founded"
                  text={foundedDate}
                />

                <PaperCard
                  title="Alexa Global Rank"
                  text={alexaRank}
                >
                  <Time
                    dateTime={alexaLastUpdated}
                    dateTimeFormat="[Updated:] MMM. DD, HH:mm"
                  />
                </PaperCard>

              </Grid>

              <Grid
                item
                xs={12}
                md={6}
              >

                <PaperCard
                  title="Address"
                  list={address}
                />

                <PaperCard
                  title="Owned By"
                  text={ownership}
                />

                <PaperCard
                  title="Publisher"
                  text={publisher}
                />

              </Grid>

              <Grid
                item
                xs={12}
                md={12}
              >

                <PaperCard
                  title="Address"
                  text="Example text"
                />

              </Grid>

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
