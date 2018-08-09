import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import Icon from '@material-ui/core/Icon';

const styles = theme => ({
});

class Publication extends React.Component {
  render() {
    const { avatarUrlToImage, backgroundColor, _id, name, url } = this.props;

    return (
      <div
        className="publications-grid__item"
      >
        <Link
          to={`/publication/${_id}`}
          style={{
            backgroundColor
          }}
        >
          {avatarUrlToImage !== undefined &&
            <img
              src={avatarUrlToImage}
            />
          }
          <span
            className="publications-grid__item__description"
          >
            <span
              className="publications-grid__item__description__name"
            >
              {name}
            </span>
            <span
              className="publications-grid__item__description__url"
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
  avatarUrlToImage: undefined,
  backgroundColor: '#000',
  classes: PropTypes.object.isRequired,
  _id: '1234567890',
  name: 'Publication name',
  url: 'publication.com'
};

Publication.propTypes = {
  avatarUrlToImage: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default withStyles(styles)(Publication);
