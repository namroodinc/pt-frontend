import React from "react";
import PropTypes from "prop-types";
import request from "superagent";

const CONTENTFUL_BASE_URL = process.env.CONTENTFUL_BASE_URL;
const CONTENT_DELIVERY_ACCESS_TOKEN = process.env.CONTENT_DELIVERY_ACCESS_TOKEN;
const SPACE_ID = process.env.SPACE_ID;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assetUrl: ''
    }
    this.handleFeaturedMedia = this.handleFeaturedMedia.bind(this);
  }

  componentWillMount() {
    const { assetId } = this.props;
    this.handleFeaturedMedia(assetId);
  }

  handleFeaturedMedia = (ASSET_ID) => {
    const self = this;
    return request
      .get(`${CONTENTFUL_BASE_URL}/spaces/${SPACE_ID}/assets/${ASSET_ID}`)
      .query(`access_token=${CONTENT_DELIVERY_ACCESS_TOKEN}`)
      .end(function(err, res) {
        if (err || !res.ok) {
          console.log('error');
        } else {
          self.setState({
            assetUrl: res.body.fields.file.url
          })
        }
      });
  }

  render() {
    return (
      <div>
        <img
          src={this.state.assetUrl}
        />
      </div>
    );
  }
}

Header.propTypes = {
  assetId: PropTypes.string
};

export default Header;
