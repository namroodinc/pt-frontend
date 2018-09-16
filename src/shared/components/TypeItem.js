import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";

import Actions from "../actions/Actions";
import { TextArea } from "./Index";

const styles = theme => ({
});

class TypeItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(body) {
    const { _id } = this.props;

    Actions.updatePublication(
      Object.assign(
        {},
        {
          id: _id
        },
        body
      )
    );
  }

  render() {
    const {
      backgroundColor,
      description,
      editMode,
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

        {editMode ?
          (
            <TextArea
              defaultValue={description}
              onSubmit={this.handleSubmit}
            />
          ) : (
            <div>
              {description &&
                <h5>
                  {description}
                </h5>
              }
            </div>
          )
        }

        {ideology.length > 0 &&
          (
            <div
              className="item__ideologies"
            >
              {editMode ?
                (
                  <div>
                    {ideology.map((item, i) =>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value="checkedC"
                          />
                        }
                        key={i}
                        label={item.name}
                      />
                    )}
                  </div>
                ) : (
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
                )
              }
            </div>
          )
        }

      </div>
    );
  }
}

TypeItem.defaultProps = {
  backgroundColor: '#F06292',
  editMode: false,
  ideology: [],
  name: 'Heading',
  type: 'publication'
};

TypeItem.propTypes = {
  _id: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  description: PropTypes.string,
  editMode: PropTypes.bool,
  ideology: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  name: PropTypes.string.isRequired,
  prettyName: PropTypes.string,
  type: PropTypes.string.isRequired,
  url: PropTypes.string,
  urlToImage: PropTypes.string
};

export default withStyles(styles)(TypeItem);
