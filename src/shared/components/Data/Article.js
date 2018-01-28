import React from "react";
import PropTypes from "prop-types";
import Card, { CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import parseDomain from "parse-domain";

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
    const { publishedAt, sentimentScore, title, url, urlToImage } = data;

    const imageCaption = parseDomain(url);

    return (
      <Card
        className={classes.card}
      >
        {urlToImage !== undefined &&
          <CardContent
            className={classes.media}
          >
            <figure>
              <a
                href={url}
                target="_blank"
              >
                <img
                  src={urlToImage}
                />
                <figcaption>
                  Photo via {imageCaption.domain}.{imageCaption.tld}
                </figcaption>
              </a>
            </figure>
          </CardContent>
        }
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
