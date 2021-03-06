import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from "@material-ui/core/styles";
import Icon from '@material-ui/core/Icon';

import Actions from "../actions/Actions";
import Store from "../stores/Store";

const styles = theme => ({
  iconButton: {
  },
  searchBox: {
    fontSize: '1.4em',
    paddingBottom: 10,
    paddingTop: 0
  },
  searchBoxWrapper: {
    width: '100%'
  }
});

@observer
class Search extends React.Component {
  handleSearchNewsItems = () => {
    Actions.getArticles(true, true);
  }

  handleSearchOnChange = (event) => {
    Actions.setSearchTerm(event.target.value);

    switch (event.key) {
    case 'Enter':
      Actions.getArticles(true, true);
      break;
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>

        <Input
          className={classes.searchBoxWrapper}
          defaultValue={Store.retrieveSearchTerm()}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                className={classes.iconButton}
                color="primary"
                onClick={this.handleSearchNewsItems}
              >
                <Icon>
                  search
                </Icon>
              </IconButton>
            </InputAdornment>
          }
          inputProps={{
            className: classes.searchBox,
            onKeyPress: this.handleSearchOnChange
          }}
          inputRef={search => this.search = search}
          placeholder="Search articles"
        />

      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Search);
