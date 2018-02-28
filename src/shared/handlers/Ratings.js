import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
// import { Link } from "react-router-dom";
// import Avatar from 'material-ui/Avatar';
// import { MenuItem } from "material-ui/Menu";
// import { FormControl } from "material-ui/Form";
// import { InputLabel } from 'material-ui/Input';
// import Select from "material-ui/Select";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
// import IconButton from "material-ui/IconButton";
// import PlayArrow from "material-ui-icons/PlayArrow";
// import classNames from "classnames";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { Banner, Loading } from "../components/Index";

const styles = theme => ({
  avatar: {
    float: 'left',
    height: 20,
    marginRight: 10,
    width: 20
  },
  centerAlign: {
    padding: '0 20px',
    textAlign: 'center'
  },
  formControl: {
    marginBottom: 15
  },
  iconButton: {
    color: '#026FC9',
    height: 20,
    marginLeft: 5,
    marginRight: 5,
    marginTop: -3,
    width: 20
  },
  iconButtonIcon: {
    height: 20,
    width: 20
  },
  iconButtonRotate: {
    transform: 'rotate(180deg)'
  },
  inputLabel: {
    whiteSpace: 'nowrap'
  }
});

@observer
class Ratings extends React.Component {
  componentWillMount() {
    const { pageId } = this.props;
    Actions.getPageWithPublicationList(pageId);
  }

  render() {
    if (Store.isLoading()) return <Loading />;
    const { classes } = this.props;

    const { bodyCopy, title } = Store.retrievePage();

    // const getRatingsForLast7Days = Store.getRatingsForLast7Days;
    const getLast7PossibleDays = Store.getLast7PossibleDays;

    return (
      <div
        className="container"
      >

        <div
          className="container__narrow"
        >
          <Banner
            title={title}
            description={bodyCopy}
          />
        </div>

        <div
          className="container"
        >

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Publication
                </TableCell>
                {getLast7PossibleDays.map((day, i) =>
                  <TableCell
                    className={classes.centerAlign}
                    key={i}
                  >
                    {day}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  Publication
                </TableCell>
                {getLast7PossibleDays.map((day, i) =>
                  <TableCell
                    className={classes.centerAlign}
                    key={i}
                  >
                    {day}
                  </TableCell>
                )}
              </TableRow>
            </TableBody>
          </Table>

        </div>

      </div>
    )
  }
}

Ratings.propTypes = {
  classes: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired
};

export default withStyles(styles)(Ratings);
