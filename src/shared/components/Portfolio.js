import React from "react";
import { observer } from 'mobx-react';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import Asset from "./Asset";

@observer
export default class Portfolio extends React.Component {
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
      <div>

        <h5>
          Portfolio
        </h5>

        {mappedPortfolioList.map((item, i) =>
          <Card
            key={i}
          >
            <Asset assetId={item.featuredMedia} />
            <CardContent>
              <Typography type="headline" component="h2">
                Lizard
              </Typography>
            </CardContent>
          </Card>
        )}

      </div>
    );
  }
}
