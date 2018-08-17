import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
});

class PublicationItem extends React.Component {
  render() {
    const {
      avatarUrlToImage,
      backgroundColor,
      description,
      ideology,
      name,
      url
    } = this.props;

    return (

      <div
        className="publication"
      >

        <div
          className="publication__avatar"
        >
          <div
            className="circle-button circle-button--extra-large"
            style={{
              backgroundColor
            }}
          >
            {avatarUrlToImage &&
              <img
                src={avatarUrlToImage}
              />
            }
          </div>
        </div>

        <h3>
          {name}
        </h3>

        <h5>
          <a
            href={`https://www.${url}`}
            target="_blank"
          >
            {url}
          </a>
        </h5>

        {description &&
          <h5>
            {description}
          </h5>
        }

        <div
          className="publication__ideologies"
        >
          {ideology !== undefined &&
            <div>
              {ideology.length > 0 &&
                <div>
                  {ideology.map((item, i) =>
                    <Link
                      key={i}
                      to={`/ideology/${item._id}`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              }
            </div>
          }
        </div>

      </div>
    );
  }
}

PublicationItem.defaultProps = {
  avatarUrlToImage: undefined,
  backgroundColor: '#000',
  description: undefined,
  _id: '1234567890',
  name: 'Publication name',
  url: 'publication.com'
};

PublicationItem.propTypes = {
  avatarUrlToImage: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  description: PropTypes.string,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default withStyles(styles)(PublicationItem);
