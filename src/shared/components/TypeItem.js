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
      prettyName,
      type,
      url,
      urlToImage
    } = this.props;

    const className = `item item--${type}`;
    const heading = prettyName || name; // TODO: update Publications to have a prettyName

    return (
      <div
        className={className}
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
          {heading}
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
  backgroundColor: '#F06292',
  name: 'Heading',
  type: 'publication'
};

TypeItem.propTypes = {
  _id: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  description: PropTypes.string,
  ideology: PropTypes.array,
  name: PropTypes.string.isRequired,
  prettyName: PropTypes.string,
  type: PropTypes.string.isRequired,
  url: PropTypes.string,
  urlToImage: PropTypes.string
};

export default withStyles(styles)(TypeItem);
