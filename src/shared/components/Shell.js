import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  // playArrowIcon: {
  //   height: 36,
  //   transform: 'rotate(-45deg)',
  //   width: 36
  // }
});

class Shell extends React.Component {
  render() {
    // const { classes } = this.props;
    return (
      <div
        className="shell"
      >
        <div
          className="shell__content"
        >
          {this.props.heading !== undefined &&
            <h1>
              {this.props.heading}
            </h1>
          }
          {this.props.subHeading !== undefined &&
            <h2>
              {this.props.subHeading}
            </h2>
          }
          {this.props.children}
        </div>
      </div>
    );
  }
}

Shell.defaultProps = {
  data: []
};

Shell.propTypes = {
  heading: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  subHeading: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  children: PropTypes.node
};

export default withStyles(styles)(Shell);
