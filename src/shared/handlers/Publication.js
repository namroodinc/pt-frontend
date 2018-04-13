import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { Grid, Paper } from "material-ui";
import { withStyles } from "material-ui/styles";
import { ArrowDownward } from "material-ui-icons";
import ReactHtmlParser from "react-html-parser";
import Marked from "marked";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { Loading } from "../components/Index";
import { PaperCard, Time } from "../components/Data/Index";

const styles = theme => ({
});

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
      ownership,
      politicalAlignment,
      publisher,
      name,
      siteRankings,
      website
    } = fields;

    const {
      updatedAt
    } = sys;

    const address = geocodeAddress.address_components.map(address => address.long_name);
    const alexa = siteRankings[siteRankings.length - 1];
    const alexaRank = alexa.data.globalRank;
    const alexaLastUpdated = alexa.timestamp;
    const alignment = politicalAlignment.join(', ');
    const formats = format.join(', ');
    const foundedDate = founded.split(';')[0];
    const publicationDescription = description || '';

    return (
      <div
        className="publication"
      >

        <div
          className="publication__banner"
          style={Store.getBrandColors}
        >

          <div
            className="publication__banner__content"
          >

            <div
              className="publication__banner__content__heading"
            >
              <h1>
                {name}
              </h1>
            </div>

            <div
              className="publication__banner__content__blurb"
            >
              {ReactHtmlParser(Marked(publicationDescription))}
            </div>

            <hr />

            <div
              className="publication__banner__content__controls"
            >
              <a
                className="publication__banner__content__controls__read-more"
                href="#more"
              >
                <ArrowDownward />
                Read more
              </a>
            </div>

          </div>

        </div>

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

          </Grid>

          <Grid
            item
            xs={12}
            md={6}
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

      </div>
    )
  }
}

Publication.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object
};

export default withStyles(styles)(Publication);
