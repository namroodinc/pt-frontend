import React from "react";
import { observer } from 'mobx-react';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import { GridList, GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
export default class PortfolioList extends React.Component {
  constructor(props) {
    super(props);
    this.handleFeaturedMedia = this.handleFeaturedMedia.bind(this);
  }

  componentWillMount() {
    Actions.updatePortfolioList();
  }

  handleFeaturedMedia = (ASSET_ID) => {
    //console.log(Promise.resolve(Actions.retrieveMediaItem(ASSET_ID)));
  }

  render() {
    const portfolioList = Store.retrievePortfolioList();

    const mappedPortfolioList = portfolioList.map((item, i) => {
      const { featuredMedia, title } = item.fields;
      return {
        title,
        featuredMedia: featuredMedia.sys.id
      }
    });

    return (
      <div>

        <h5>
          Portfolio
        </h5>

        <GridList
          cellHeight={400}
          cols={3}
        >
          {mappedPortfolioList.map((item, i) =>
            <GridListTile
              key={i}
            >
              <Card>
                <CardMedia
                  image={this.handleFeaturedMedia(item.featuredMedia)}
                  title={item.title}
                />
                <CardContent>
                  <Typography
                    type="headline"
                    component="h2"
                  >
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            </GridListTile>
          )}
        </GridList>

      </div>
    );
  }
}
