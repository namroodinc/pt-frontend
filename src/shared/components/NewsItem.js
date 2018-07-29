import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  button: {
    margin: '0 10px 10px 0'
  }
});

class NewsItem extends React.Component {
  render() {
    const { authors, datePublished, description, publication, title, trends } = this.props;
    const id = this.props._id;

    const authorsJoin = authors.map(author => author.name).join(', ');
    const timeAgo = moment(datePublished).fromNow();
    const trendsJoin = trends !== null ? trends.join(', ') : '';

    return (
      <div
        className="news-item"
      >

        <h4
          className="news-item__heading"
        >
          <Link
            to={`/article/${id}`}
          >
            {title}
          </Link>
        </h4>

        <span
          className="news-item__description"
        >
          {description}
        </span>

        <div
          className="news-item__footer"
        >
          <span
            className="news-item__footer__publication"
          >
            <Link
              to={`/publication/${publication._id}`}
            >
              {publication.name}
            </Link>
          </span>
          <span
            className="news-item__footer__time"
          >
            {timeAgo}
          </span>
          <span
            className="news-item__footer__information"
          >
            <span
              className="news-item__footer__information__icon"
            >
              <Tooltip
                title={authorsJoin}
              >
                <Icon>
                  {authors.length > 1 ? 'people' : 'person'}
                </Icon>
              </Tooltip>
            </span>
            <span
              className="news-item__footer__information__icon"
            >
              <Tooltip
                title={trendsJoin}
              >
                <Icon>
                  local_offer
                </Icon>
              </Tooltip>
            </span>
          </span>
        </div>
      </div>
    );
  }
}

NewsItem.defaultProps = {
  authors: [
    {
      'name': 'Leonardo'
    },
    {
      'name': 'Donatello'
    },
    {
      'name': 'Raphael'
    },
    {
      'name': 'Michaelangelo'
    }
  ],
  datePublished: '2018-07-01T00:05:00Z',
  description: 'A description about the news article.',
  publication: {
    id: 'the-new-yorker',
    name: 'The New Yorker'
  },
  title: 'News headline',
  trends: [
    'United Kingdom',
    'Europe',
    'World'
  ]
};

NewsItem.propTypes = {
  authors: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  classes: PropTypes.object.isRequired,
  datePublished: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  publication: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  trends: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};

export default withStyles(styles)(NewsItem);
