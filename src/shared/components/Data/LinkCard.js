import React from "react";
import { Button, Paper } from "material-ui";
import PlayArrow from "material-ui-icons/PlayArrow";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Color from "color";

const styles = theme => ({
  button: {
    boxShadow: `0 0 0 transparent`,
    float: 'right'
  },
  icon: {
    marginRight: -5
  },
  paperCard: {
    borderBottomWidth: 0,
    marginBottom: 20,
    padding: 20
  }
});

class PaperCard extends React.Component {
  render() {
    const { backgroundColor, classes, linkHref, linkText, title } = this.props;
    const color = Color(backgroundColor).isLight() ? '#000' : '#FFF';

    return (
      <Paper
        className={classes.paperCard}
        style={{
          backgroundColor,
          color
        }}
      >

        <h3>
          {title}
        </h3>

        {this.props.children}

        <div>
          <Button
            className={classes.button}
            color="primary"
            href={linkHref}
          >
            {linkText}
            <PlayArrow
              className={classes.icon}
            />
          </Button>
        </div>

      </Paper>
    );
  }
}

PaperCard.defaultProps = {
  backgroundColor: '#026FC9',
  linkHref: '/',
  linkText: 'Read More'
};

PaperCard.propTypes = {
  backgroundColor: PropTypes.string,
  classes: PropTypes.object.isRequired,
  children: PropTypes.object,
  linkHref: PropTypes.string,
  linkText: PropTypes.string,
  title: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(PaperCard);
