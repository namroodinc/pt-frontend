import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
});

class Publication extends React.Component {
  render() {
    const { backgroundColor, _id, name, url, urlToImage } = this.props;

    return (
      <div
        className="cube__item"
      >
        <Link
          to={`/publication/${_id}`}
          style={{
            backgroundColor
          }}
        >
          {urlToImage !== undefined &&
            <img
              src={urlToImage}
            />
          }
          <span
            className="cube__item__description"
          >
            <span
              className="cube__item__description__name"
            >
              {name}
            </span>
            <span
              className="cube__item__description__url"
            >
              {url}
            </span>
          </span>
        </Link>
      </div>
    );
  }
}

Publication.defaultProps = {
  _id: '1234567890',
  backgroundColor: '#000',
  classes: PropTypes.object.isRequired,
  name: 'Publication name',
  url: 'publication.com'
};

Publication.propTypes = {
  _id: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  urlToImage: PropTypes.string
};

export default withStyles(styles)(Publication);
