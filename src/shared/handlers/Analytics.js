import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import { Link } from "react-router-dom";
import Avatar from 'material-ui/Avatar';

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { Banner, Loading } from "../components/Index";
// import { Time } from "../components/Data/Index";

const styles = theme => ({
  avatar: {
    float: 'left',
    height: 20,
    marginRight: 10,
    width: 20
  }
});

@observer
class Analytics extends React.Component {
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
    console.log(getAllComplaints);

    return (
      <div
        className="container"
      >

        <Grid
          container
          spacing={24}
        >

          <Grid
            item
            md={8}
            xs={12}
          >

            <Banner
              title={title}
              description={bodyCopy}
            />

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

          </Grid>

          <Grid
            item
            md={4}
            xs={12}
          >
            Sidebar component to go here
          </Grid>

        </Grid>

      </div>
    )
  }
}

Analytics.propTypes = {
  classes: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired
};

export default withStyles(styles)(Analytics);
