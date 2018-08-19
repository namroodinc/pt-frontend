import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
});

class TypeItem extends React.Component {
  render() {
    const {
      backgroundColor,
      description,
      ideology,
      name,
      url,
      urlToImage
    } = this.props;

    return (
      <div
        className="item"
      >

        <div
          className="item__avatar"
        >
          <div
            className="circle-button circle-button--extra-large"
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
          className="item__ideologies"
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

TypeItem.defaultProps = {
  backgroundColor: '#000',
  description: undefined,
  _id: '1234567890',
  ideology: [],
  name: 'Publication name',
  url: 'publication.com',
  urlToImage: undefined
};

TypeItem.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  description: PropTypes.string,
  _id: PropTypes.string.isRequired,
  ideology: PropTypes.array,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  urlToImage: PropTypes.string
};

export default withStyles(styles)(TypeItem);
