import React from "react";
import PropTypes from "prop-types";

import { Article, PressComplaints } from "./Index";

class TimelineStory extends React.Component {
  render() {
    const { backgroundColor, ipsoList, story } = this.props;

    return (
      <div
        className="timeline__story"
      >
        {story.data !== undefined &&
          <div>
            {story.data.globalRank !== undefined ?
              <div>
                Global Rank
              </div> : <PressComplaints
                backgroundColor={backgroundColor}
                data={story}
                ipsoList={ipsoList}
              />
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
          <Article
            backgroundColor={backgroundColor}
            data={story}
          />
        }
      </div>
    )
  }
}

TimelineStory.defaultProps = {
  backgroundColor: '026FC9'
};

TimelineStory.propTypes = {
  backgroundColor: PropTypes.string,
  ipsoList: PropTypes.string,
  story: PropTypes.object.isRequired
};

export default TimelineStory;
