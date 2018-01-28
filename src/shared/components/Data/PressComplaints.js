import React from "react";
import PropTypes from "prop-types";
import Color from "color";
import Card, { CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

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
    const { backgroundColor, classes, title } = this.props; // data,
    const bgColor = Color(`#${backgroundColor}`);
    const color = bgColor.isDark() ? '#FFF' : '#000';

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
          <Typography
            type="body1"
          >
            blah
          </Typography>
        </CardContent>
        <span />
      </Card>
    );
  }
}

PressComplaints.defaultProps = {
  backgroundColor: '026FC9',
  title: 'Updated IPSO Rulings'
};

PressComplaints.propTypes = {
  backgroundColor: PropTypes.string,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  title: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(PressComplaints);
