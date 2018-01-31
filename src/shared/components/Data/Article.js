import React from "react";
import PropTypes from "prop-types";
import Card, { CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

import { Sentiment, Time } from "./Index";

const styles = theme => ({
  card: {
    display: 'flex'
  },
  media: {
    marginRight: 20,
    minWidth: 200
  }
});

class Article extends React.Component {
  render() {
    const { classes, data } = this.props;
    const { publishedAt, sentimentScore, title } = data;

    return (
      <Card
        className={classes.card}
      >
        <div
          className={classes.description}
        >
          <CardContent>
            <Time
              dateTime={publishedAt}
            />
            <Typography
              type="headline"
            >
              {title}
            </Typography>
            <Sentiment
              score={sentimentScore.title.score.score}
            />
          </CardContent>
        </div>
      </Card>
    );
  }
}

Article.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Article);
