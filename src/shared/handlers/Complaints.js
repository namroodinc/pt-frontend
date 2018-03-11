import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Avatar from 'material-ui/Avatar';

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { Banner, Loading } from "../components/Index";

const styles = theme => ({
  avatar: {
    height: 40,
    width: 40
  }
});

@observer
class Complaints extends React.Component {
  componentWillMount() {
    const { pageId } = this.props;
    Actions.getPageWithPublicationList(pageId);
  }

  render() {
    if (Store.isLoading()) return <Loading />;
    const { classes } = this.props;

    const {
      bodyCopy,
      title
    } = Store.retrievePage();

    const getAllComplaints = Store.getAllComplaints;

    return (
      <div
        className="container"
      >

        <div
          className="content"
        >

          <div
            className="content__wrapper"
          >
            <Banner
              title={title}
              description={bodyCopy}
            />
          </div>

          <div
            className="content__wrapper content__wrapper--no-padding-left-right"
          >

            <h4>
              Publications
            </h4>

            <div
              className="metric-list"
            >
              {getAllComplaints.map((paper, i) =>
                <div
                  className="metric-list__item"
                  key={i}
                >
                  <div
                    className="metric-list__item__left"
                  >
                    <div
                      className="metric-list__item__left__avatar"
                    >
                      <Link
                        to={`/publication/${paper.id}`}
                      >
                        <Avatar
                          alt={paper.name}
                          className={classes.avatar}
                          src={paper.assetUrl}
                        />
                      </Link>
                    </div>
                    <div
                      className="metric-list__item__left__name"
                    >
                      <Link
                        style={{
                          color: paper.fill
                        }}
                        to={`/publication/${paper.id}`}
                      >
                        {paper.name}
                      </Link>
                      <a
                        className="website"
                        href={paper.websiteUrl}
                        target="_blank"
                      >
                        {paper.websiteText}
                      </a>
                    </div>
                  </div>
                  <div
                    className="metric-list__item__right"
                  >
                    <div
                      className="metric-list__item__right__grid"
                    >
                      <div
                        className="metric-list__item__right__grid__item"
                        data-label="Resolved"
                      >
                        {paper.complaints.Resolved}
                      </div>
                      <div
                        className="metric-list__item__right__grid__item"
                        data-label="Upheld"
                      >
                        {paper.complaints.Upheld}
                      </div>
                      <div
                        className="metric-list__item__right__grid__item"
                        data-label="Settlement"
                      >
                        {paper.complaints['Sufficient Remedial Action']}
                      </div>
                      <div
                        className="metric-list__item__right__grid__item"
                        data-label="No finding"
                      >
                        {paper.complaints['No finding']}
                      </div>
                      <div
                        className="metric-list__item__right__grid__item"
                        data-label="Not Upheld"
                      >
                        {paper.complaints['Not Upheld']}
                      </div>
                      <div
                        className="metric-list__item__right__grid__item"
                        data-label="Total"
                      >
                        {paper.complaints.Total}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    )
  }
}

Complaints.propTypes = {
  classes: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired
};

export default withStyles(styles)(Complaints);
