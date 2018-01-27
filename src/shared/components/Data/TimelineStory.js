import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";

import { Time } from "./Index";

const styles = theme => ({
  card: {
    display: 'flex'
  },
  media: {
    flexGrow: 1,
    marginRight: 10
  },
  description: {
    flexGrow: 3
  }
});

class TimelineStory extends React.Component {
  render() {
    const { classes, story } = this.props;

    return (
      <div
        className="timeline__story"
      >
        {story.data !== undefined &&
          <div>
            {story.data.globalRank !== undefined ?
              <div>
                Global Rank
              </div> : <div>
                IPSO
              </div>
            }
          </div>
        }
        {story.ratings !== undefined &&
          <div>
            <div>
              Rating
            </div>
          </div>
        }
        {story.title !== undefined &&
          <Card
            className={classes.card}
          >
            {story.urlToImage !== undefined &&
              <CardContent
                className={classes.media}
              >
                <a
                  href={story.url}
                  target="_blank"
                >
                  <img
                    src={story.urlToImage}
                  />
                </a>
              </CardContent>
            }
            <div
              className={classes.description}
            >
              <CardContent>
                <Time
                  dateTime={story.publishedAt}
                />
                <Typography
                  type="headline"
                >
                  {story.title}
                </Typography>
              </CardContent>
            </div>
          </Card>
        }
      </div>
    )
  }
}

TimelineStory.propTypes = {
  classes: PropTypes.object.isRequired,
  story: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(TimelineStory);
