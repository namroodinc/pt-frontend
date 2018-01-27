import React from "react";
import PropTypes from "prop-types";

import { TimelineStory } from "./Index";

class Timeline extends React.Component {
  render() {
    const { data, title } = this.props;

    const timeline = data.sort((a, b) => {
      return new Date(b.publishedAt || b.timestamp) - new Date(a.publishedAt || a.timestamp);
    });

    return (
      <div
        className="timeline"
      >

        <h3>
          {title}
        </h3>

        {timeline.map((story, i) =>
          <TimelineStory
            story={story}
            key={i}
          />
        )}

      </div>
    )
  }
}

Timeline.defaultProps = {
  title: 'Timeline'
};

Timeline.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired
};

export default Timeline;
