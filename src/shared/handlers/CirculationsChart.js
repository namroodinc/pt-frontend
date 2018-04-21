import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { ContentWithSidebar, Loading } from "../components/Index";

const styles = theme => ({
});

@observer
class CirculationsChart extends React.Component {
  componentWillMount() {
    Actions.updatePublicationList();
  }

  render() {
    if (Store.isLoading()) return <Loading />;
    // const { classes } = this.props;

    return (
      <ContentWithSidebar>
        sss
      </ContentWithSidebar>
    )
  }
}

CirculationsChart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CirculationsChart);
