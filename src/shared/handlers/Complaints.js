import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { Banner, ContentWithSidebar, Loading } from "../components/Index";
import { DownloadJsonToCsv } from "../components/Controls/Index";

const styles = theme => ({
});

@observer
class Complaints extends React.Component {
  componentWillMount() {
    const { pageId } = this.props;
    Actions.getPageWithPublicationList(pageId);
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const {
      bodyCopy,
      title
    } = Store.retrievePage();

    const getAllComplaints = Store.getAllComplaints;

    return (
      <ContentWithSidebar>

        <Banner
          title={title}
          description={bodyCopy}
        />

        <div
          className="container"
        >
          <div>
            <DownloadJsonToCsv
              fields={[
                'Publication',
                'Resolved',
                'Upheld',
                'Settlement',
                'No Finding',
                'Not Upheld',
                'Total'
              ]}
              data={getAllComplaints.map((paper, i) => {
                return {
                  'Publication': paper.name,
                  'Resolved': paper.complaints.Resolved,
                  'Upheld': paper.complaints.Upheld,
                  'Settlement': paper.complaints['Sufficient Remedial Action'],
                  'No Finding': paper.complaints['No finding'],
                  'Not Upheld': paper.complaints['Not Upheld'],
                  'Total': paper.complaints.Total
                }
              })}
            />
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Publication
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
                  Settlement
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
                <TableCell
                  numeric
                >
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getAllComplaints.map((paper, i) =>
                <TableRow>
                  <TableCell>
                    <Link
                      style={{
                        color: paper.fill
                      }}
                      to={`/publication/${paper.id}`}
                    >
                      {paper.name}
                    </Link>
                  </TableCell>
                  <TableCell
                    numeric
                  >
                    {paper.complaints.Resolved}
                  </TableCell>
                  <TableCell
                    numeric
                  >
                    {paper.complaints.Upheld}
                  </TableCell>
                  <TableCell
                    numeric
                  >
                    {paper.complaints['Sufficient Remedial Action']}
                  </TableCell>
                  <TableCell
                    numeric
                  >
                    {paper.complaints['No finding']}
                  </TableCell>
                  <TableCell
                    numeric
                  >
                    {paper.complaints['Not Upheld']}
                  </TableCell>
                  <TableCell
                    numeric
                  >
                    {paper.complaints.Total}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </ContentWithSidebar>
    )
  }
}

Complaints.propTypes = {
  classes: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired
};

export default withStyles(styles)(Complaints);
