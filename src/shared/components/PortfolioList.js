import React from "react";
import { observer } from 'mobx-react';
import Card, { CardContent } from 'material-ui/Card';
import { GridList, GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';

import Asset from "./Asset";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

@observer
export default class PortfolioList extends React.Component {
  componentWillMount() {
    Actions.updatePortfolioList();
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
      <div
        className="portfolio"
      >

        <GridList
          cellHeight="auto"
          cols={3}
          spacing={20}
        >
          {mappedPortfolioList.map((item, i) =>
            <GridListTile
              key={i}
            >
              <Card
                elevation={0}
                raised={false}
                square
              >
                <Asset
                  assetId={item.featuredMedia}
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
