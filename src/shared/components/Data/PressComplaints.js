import React from "react";
import PropTypes from "prop-types";
import Color from "color";
import Card, { CardContent } from "material-ui/Card";
import { withStyles } from "material-ui/styles";

import { Table, Time } from "./Index";

const styles = theme => ({
  card: {
    marginBottom: 10,
    padding: 20
  },
  cardContent: {
    padding: 0
  },
  metrics: {
    padding: 0
  }
});

class PressComplaints extends React.Component {
  render() {
    const { backgroundColor, classes, data, ipsoList, title, viewMoreBaseUrl } = this.props;
    const bgColor = Color(`#${backgroundColor}`);
    const color = bgColor.isDark() ? '#FFF' : '#000';

    const pressComplaintsData = data.data;

    const columns = [
      {
        label: 'Total Rulings',
        value: 'total'
      },
      {
        label: 'Upheld',
        value: 'upheld'
      },
      {
        label: 'Resolved',
        value: 'resolved'
      },
      {
        label: 'Sufficient Remedial Action',
        value: 'sufficientRemedialAction'
      },
      {
        label: 'Not Upheld',
        value: 'notUpheld'
      },
      {
        label: 'No finding',
        value: 'noFinding'
      }
    ];
    const rows = [
      {
        total: {
          label: (
            <a
              href={`${viewMoreBaseUrl}${ipsoList}`}
              target="_blank"
            >
              {pressComplaintsData.Total}
            </a>
          )
        },
        upheld: {
          label: (
            <a
              href={`${viewMoreBaseUrl}${ipsoList}&outcomes=26,1`}
              target="_blank"
            >
              {pressComplaintsData.Upheld}
            </a>
          )
        },
        resolved: {
          label: (
            <a
              href={`${viewMoreBaseUrl}${ipsoList}&outcomes=3`}
              target="_blank"
            >
              {pressComplaintsData.Resolved}
            </a>
          )
        },
        sufficientRemedialAction: {
          label: (
            <a
              href={`${viewMoreBaseUrl}${ipsoList}&outcomes=27`}
              target="_blank"
            >
              {pressComplaintsData['Sufficient Remedial Action']}
            </a>
          )
        },
        notUpheld: {
          label: (
            <a
              href={`${viewMoreBaseUrl}${ipsoList}&outcomes=2`}
              target="_blank"
            >
              {pressComplaintsData['Not Upheld']}
            </a>
          )
        },
        noFinding: {
          label: (
            <a
              href={`${viewMoreBaseUrl}${ipsoList}&outcomes=28`}
              target="_blank"
            >
              {pressComplaintsData['No finding']}
            </a>
          )
        }
      }
    ];
    const notes = [
      (
        <div>
          <p>
            Last updated: <Time dateTime={data.timestamp} />
          </p>
        </div>
      ),
      (
        <div>
          <p>
            <a
              href={`${viewMoreBaseUrl}${ipsoList}`}
              target="_blank"
            >
              View {title} in detail
            </a>
          </p>
        </div>
      )
    ]

    return (
      <Card
        className={classes.card}
        style={{
          backgroundColor,
          color
        }}
      >
        <CardContent
          className={classes.cardContent}
        >
          <h3
            style={{
              color,
              lineHeight: 'normal'
            }}
          >
            {title}
          </h3>
        </CardContent>
        <CardContent
          className={classes.metrics}
        >
          <Table
            columns={columns}
            notes={notes}
            rows={rows}
          />
        </CardContent>
        <span />
      </Card>
    );
  }
}

PressComplaints.defaultProps = {
  backgroundColor: '026FC9',
  title: 'Updated IPSO Rulings',
  viewMoreBaseUrl: 'https://www.ipso.co.uk/rulings-and-resolution-statements/?page=1&perPage=100&publications='
};

PressComplaints.propTypes = {
  backgroundColor: PropTypes.string,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  ipsoList: PropTypes.string,
  title: PropTypes.string,
  viewMoreBaseUrl: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(PressComplaints);
