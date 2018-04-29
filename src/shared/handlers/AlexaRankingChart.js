import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import {
  Banner,
  ContentWithSidebar,
  Loading
} from "../components/Index";
import { Alexa } from "../components/Charts/Index";

const styles = theme => ({
  avatar: {
    float: 'left',
    height: 20,
    marginRight: 10,
    width: 20
  }
});

@observer
class AlexaRankingChart extends React.Component {
  componentWillMount() {
    Actions.updatePublicationList();
  }

  render() {
    if (Store.isLoading()) return <Loading />;
    // const { classes } = this.props;

    const getAllAlexaRankings = Store.getAllAlexaRankings;

    const title = "Alexa Rankings";
    const bodyCopy = "Blurb about Alexa chart rankings *goes here*";

    return (
      <ContentWithSidebar>

        <Banner
          title={title}
          description={bodyCopy}
        />

        <div>
          {getAllAlexaRankings.map((publication, i) => {
            const { assetUrl, fill, name, rankings, websiteText } = publication;
            return (
              <Alexa
                assetUrl={assetUrl}
                fill={fill}
                key={i}
                name={name}
                rankings={rankings}
                website={websiteText}
              />
            )
          })}
        </div>

      </ContentWithSidebar>
    )
  }
}

AlexaRankingChart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AlexaRankingChart);
