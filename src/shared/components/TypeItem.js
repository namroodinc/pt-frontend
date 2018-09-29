import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { withStyles } from "@material-ui/core/styles";

import Actions from "../actions/Actions";
import { TextArea } from "./Index";

const styles = theme => ({
});

class TypeItem extends React.Component {
  constructor(props) {
    super(props);
    const {
      ideology
    } = this.props;

    this.state = {
      ideologies: ideology.map(item => item._id),
      tab: 0
    }

    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleCheckbox(event) {
    const { checked, value } = event.target;

    if (checked) {
      this.setState({
        ideologies: [...this.state.ideologies, value]
      });
    } else {
      const { ideologies } = this.state;
      const findIndex = ideologies.indexOf(value);

      if (findIndex > -1) ideologies.splice(findIndex, 1);

      this.setState({
        ideologies
      });
    }
  }

  handleSubmit(body) {
    const { _id, type } = this.props;

    switch (type) {
    case 'ideology':
      Actions.updateIdeology(
        _id,
        Object.assign(
          {},
          body
        )
      );
      break;
    case 'publication':
      Actions.updatePublication(
        Object.assign(
          {},
          {
            id: _id
          },
          body
        )
      );
      break;
    }
  }

  handleTabChange = (event, tab) => {
    this.setState({
      tab
    });
  };

  render() {
    const {
      backgroundColor,
      characterLimit,
      description,
      editMode,
      ideology,
      ideologies,
      name,
      prettyName,
      rows,
      type,
      url,
      urlToImage
    } = this.props;

    const {
      tab
    } = this.state;

    const stateIdeologies = this.state.ideologies;

    const className = `item item--${type}`;
    const heading = prettyName || name; // TODO: update Publications to have a prettyName

    return (
      <div
        className={className}
      >

        <div
          className="item__header"
        >
          <div
            className="item__header__avatar"
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

          <div
            className="item__header__title"
          >
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
          </div>
        </div>

        {(editMode && type === 'publication') &&
          <Tabs
            centered
            fullWidth
            indicatorColor="primary"
            onChange={this.handleTabChange}
            textColor="primary"
            value={this.state.tab}
          >
            <Tab
              label="Description"
            />
            <Tab
              label="Ideologies"
            />
          </Tabs>
        }

        {editMode ?
          (
            <div>
              {tab === 0 &&
                <TextArea
                  characterLimit={characterLimit}
                  defaultValue={description}
                  label="Description"
                  onSubmit={this.handleSubmit}
                  rows={rows}
                />
              }
            </div>
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

        {(ideology.length > 0 || ideologies.length) > 0 &&
          (
            <div
              className="item__ideologies"
            >
              {editMode ?
                (
                  <div>
                    {tab === 1 &&
                      <div>
                        {ideologies.map((item, i) =>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={stateIdeologies.findIndex(ideology => ideology === item._id) > -1}
                                onChange={this.handleCheckbox}
                                value={item._id}
                              />
                            }
                            key={i}
                            label={item.name}
                          />
                        )}

                        <div
                          className="item__ideologies__controls"
                        >
                          <Button
                            color="primary"
                            onClick={this.handleSubmit.bind(this, {
                              'ideology': stateIdeologies
                            })}
                            variant="contained"
                          >
                            <span>
                              Submit ideologies
                            </span>
                          </Button>
                        </div>
                      </div>
                    }
                  </div>
                ) : (
                  <div>
                    {ideology.map((ideology, i) =>
                      <Link
                        key={i}
                        to={`/ideology/${ideology._id}`}
                      >
                        {ideology.name}
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
  characterLimit: 280,
  editMode: false,
  ideology: [],
  ideologies: [],
  name: 'Heading',
  rows: 4,
  type: 'publication'
};

TypeItem.propTypes = {
  _id: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  characterLimit: PropTypes.number,
  classes: PropTypes.object.isRequired,
  description: PropTypes.string,
  editMode: PropTypes.bool,
  ideology: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  ideologies: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  name: PropTypes.string.isRequired,
  prettyName: PropTypes.string,
  rows: PropTypes.number,
  type: PropTypes.string.isRequired,
  url: PropTypes.string,
  urlToImage: PropTypes.string
};

export default withStyles(styles)(TypeItem);
