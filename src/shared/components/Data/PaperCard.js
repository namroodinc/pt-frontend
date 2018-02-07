import React from "react";
import { Paper } from "material-ui";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  list: {
    display: 'block'
  }
});

class PaperCard extends React.Component {
  render() {
    const { classes, list, text, title } = this.props;

    return (
      <Paper>

        <h4>
          {title}
        </h4>

        {text !== undefined &&
          <span>
            {text}
          </span>
        }

        {list !== undefined &&
          <span>
            {list.map((item, i) =>
              <span
                className={classes.list}
                key={i}
              >
                {item}
              </span>
            )}
          </span>
        }

        {this.props.children}

      </Paper>
    )
  }
}

PaperCard.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.array,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  title: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(PaperCard);
