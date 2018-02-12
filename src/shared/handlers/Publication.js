import React from "react";
import { observer } from 'mobx-react';
import PropTypes from "prop-types";
import { Grid, Paper } from "material-ui";
import ReactHtmlParser from "react-html-parser";
import Marked from "marked";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { Loading, Rating } from "../components/Index";
import { PaperCard, PressComplaint, Time } from "../components/Data/Index"; //Table, Timeline

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
      description,
      format,
      founded,
      geocodeAddress,
      independentPressStandardsOrganisation,
      overallRating,
      ownership,
      politicalAlignment,
      pressComplaints,
      publicationPrice,
      publisher,
      name,
      siteRankings,
      website
    } = fields;

    const {
      updatedAt
    } = sys;

    const currencySymbol = {
      AUD: '$',
      GBP: '£',
      USD: '$'
    };

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
    const publicationDescription = description || '';

    const complaints = [];
    if (pressComplaints.data !== undefined) {
      complaints.push(pressComplaints.data);
    }
    if (independentPressStandardsOrganisation.data !== undefined) {
      complaints.push(independentPressStandardsOrganisation.data);
    }

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

            </Grid>

          </Grid>

          {complaints.length > 0 &&
            <Paper>
              <PressComplaint
                data={complaints}
              />
            </Paper>
          }

        </div>

      </div>
    )
  }
}

Publication.propTypes = {
  match: PropTypes.object
};

export default Publication;
