import React from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";

import { TimelineStory } from "./Index";

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedLimit: false
    }
  }

  handleOnLoadMore = () => {
    this.setState({
      expandedLimit: !this.state.expandedLimit
    });
  }

  render() {
    const { backgroundColor, data, itemLimit, ipsoList } = this.props;

    const timeline = data.sort((a, b) => {
      return new Date(b.publishedAt || b.timestamp) - new Date(a.publishedAt || a.timestamp);
    });

    const numberOfItems = this.state.expandedLimit ? timeline : timeline.slice(0, itemLimit);

    return (
      <div
        className="timeline"
      >

        {numberOfItems.map((story, i) =>
          <TimelineStory
            backgroundColor={backgroundColor}
            ipsoList={ipsoList}
            story={story}
            key={i}
          />
        )}

        {itemLimit <= timeline.length &&
          <div
            className="timeline__controls"
          >
            <Button
              color="primary"
              onClick={this.handleOnLoadMore}
              raised
            >
              {this.state.expandedLimit ?
                <span>
                  Hide More
                </span> : <span>
                  Show More
                </span>
              }
            </Button>
          </div>
        }

      </div>
    )
  }
}

Timeline.defaultProps = {
  backgroundColor: '026FC9',
  title: 'Timeline',
  itemLimit: 40
};

Timeline.propTypes = {
  backgroundColor: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
  itemLimit: PropTypes.number,
  ipsoList: PropTypes.string
};

export default Timeline;
