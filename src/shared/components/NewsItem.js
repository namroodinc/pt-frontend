import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";

import PublicationLabel from "./PublicationLabel";

const styles = theme => ({
  button: {
    margin: '0 10px 10px 0'
  }
});

class NewsItem extends React.Component {
  render() {
    const { authors, datePublished, description, publication, section, title, trends, url } = this.props;
    const id = this.props._id;

    const authorsHtml = (
      <div>
        {authors.length > 0 &&
          <div
            className="news-item__authors"
          >
            {authors.map((author, i) =>
              <Link
                key={i}
                to={`/author/${author._id}`}
              >
                {author.prettyName}
              </Link>
            )}
          </div>
        }
      </div>
    );
    const timeAgo = moment(datePublished).fromNow();
    const trendsHtml = (
      <div>
        {trends.length > 0 &&
          <div
            className="news-item__trends"
          >
            {trends.map((trend, i) =>
              <Link
                key={i}
                to={`/?trend=${trend}`}
              >
                {trend}
              </Link>
            )}
          </div>
        }
      </div>
    );

    return (
      <div
        className="news-item"
      >

        {section &&
          <span
            className="news-item__section"
          >
            <Link
              to={`/section/${section}`}
            >
              {section}
            </Link>
          </span>
        }

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
          className="news-item__publication"
        >
          <span
            className="news-item__publication__label"
          >
            <PublicationLabel
              publication={publication}
            />
          </span>
          <span
            className="news-item__publication__time"
          >
            {timeAgo}
          </span>
          <span
            className="news-item__publication__url"
          >
            <a
              href={url}
              target="_blank"
            >
              Link to article
            </a>
          </span>
        </div>

        {authorsHtml}

        {trendsHtml}

      </div>
    );
  }
}

NewsItem.defaultProps = {
  authors: [
    {
      '_id': '123',
      'prettyName': 'Author Name'
    }
  ],
  datePublished: '2018-07-01T00:05:00Z',
  description: 'A description about the news article.',
  publication: {
    '_id': '123',
    'name': 'Publication Name'
  },
  section: 'World News',
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
  section: PropTypes.string,
  title: PropTypes.string.isRequired,
  trends: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};

export default withStyles(styles)(NewsItem);
