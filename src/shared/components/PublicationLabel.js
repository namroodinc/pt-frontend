import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: '0 10px 10px 0'
  }
});

class PublicationLabel extends React.Component {
  render() {
    const { publication } = this.props;
    const { _id, backgroundColor, name, urlToImage } = publication;

    return (
      <div
        className="publication-label"
      >
        <div
          className="publication__avatar publication-label__avatar"
        >
          <div
            className="circle-button circle-button--extra-small"
            style={{
              backgroundColor
            }}
          >
            {urlToImage &&
              <img
                src={urlToImage}
              />
            }
          </div>
        </div>
        <a
          href={`/publication/${_id}`}
        >
          {name}
        </a>
      </div>
    );
  }
}

PublicationLabel.defaultProps = {
  publication: {
    _id: '1234567890',
    name: 'The Daily Bugle'
  }
};

PublicationLabel.propTypes = {
  classes: PropTypes.object.isRequired,
  publication: PropTypes.object.isRequired
};

export default withStyles(styles)(PublicationLabel);
