import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import { Link } from "react-router-dom";
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
                    asd
                  </div>
                </div>
              )}
            </div>

          </div>

          <div
            className="content__wrapper content__wrapper--no-padding-left-right"
          >

            <div
              className="table-wrapper"
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Publication
                    </TableCell>
                    <TableCell
                      numeric
                    >
                      Total
                    </TableCell>
                    <TableCell
                      numeric
                    >
                      Resolved
                    </TableCell>
                    <TableCell
                      numeric
                    >
                      Upheld
                    </TableCell>
                    <TableCell
                      numeric
                    >
                      Sufficient<br/>
                      Remedial Action
                    </TableCell>
                    <TableCell
                      numeric
                    >
                      No Finding
                    </TableCell>
                    <TableCell
                      numeric
                    >
                      Not Upheld
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getAllComplaints.map((paper, i) =>
                    <TableRow
                      key={i}
                    >
                      <TableCell>
                        <Link
                          style={{
                            color: paper.fill,
                            display: 'block',
                            lineHeight: '1.5em',
                            overflow: 'hidden'
                          }}
                          to={`/publication/${paper.id}`}
                        >
                          <Avatar
                            alt={paper.name}
                            className={classes.avatar}
                            src={paper.assetUrl}
                          />
                          {paper.name}
                        </Link>
                      </TableCell>
                      <TableCell
                        numeric
                      >
                        <span
                          style={{
                            color: paper.fill,
                            display: 'block',
                            fontWeight: 700
                          }}
                        >
                          {paper.complaints.Total}
                        </span>
                      </TableCell>
                      <TableCell
                        numeric
                      >
                        <span
                          style={{
                            color: paper.fill,
                            display: 'block'
                          }}
                        >
                          {paper.complaints.Resolved}
                        </span>
                      </TableCell>
                      <TableCell
                        numeric
                      >
                        <span
                          style={{
                            color: paper.fill,
                            display: 'block'
                          }}
                        >
                          {paper.complaints.Upheld}
                        </span>
                      </TableCell>
                      <TableCell
                        numeric
                      >
                        <span
                          style={{
                            color: paper.fill,
                            display: 'block'
                          }}
                        >
                          {paper.complaints['Sufficient Remedial Action']}
                        </span>
                      </TableCell>
                      <TableCell
                        numeric
                      >
                        <span
                          style={{
                            color: paper.fill,
                            display: 'block'
                          }}
                        >
                          {paper.complaints['No finding']}
                        </span>
                      </TableCell>
                      <TableCell
                        numeric
                      >
                        <span
                          style={{
                            color: paper.fill,
                            display: 'block'
                          }}
                        >
                          {paper.complaints['Not Upheld']}
                        </span>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
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
