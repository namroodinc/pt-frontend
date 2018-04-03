import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import { FileDownload } from "material-ui-icons";
import Papa from "papaparse";

import DownloadCsv from "../../utils/downloadCsv";

const styles = theme => ({
  leftIcon: {
    marginRight: 10
  }
});

class DownloadJsonToCsv extends React.Component {
  handleOnClick = (csv) => {
    DownloadCsv(csv);
  }

  render() {
    const { classes, data, fields } = this.props;

    const csv = Papa.unparse({
      fields,
      data
    });

    return (
      <div>
        <Button
          color="primary"
          size="medium"
          onClick={this.handleOnClick.bind(this, csv)}
          variant="flat"
        >
          <FileDownload
            className={classes.leftIcon}
          />
          Download CSV
        </Button>
      </div>
    )
  }
}

DownloadJsonToCsv.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired
};

export default withStyles(styles)(DownloadJsonToCsv);
