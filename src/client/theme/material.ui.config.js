// Use this for reference: https://material-ui-next.com/customization/themes/
// An example for styling a new compnent: https://github.com/mui-org/material-ui/blob/v1-beta/src/Table/TableCell.js

import grey from 'material-ui/colors/grey';

import Styles from '../styles/app.scss'
const { primaryColor, white } = Styles;

export default {
  palette: {
    primary: {
      ...grey,
      500: primaryColor
    },
    secondary: {
      ...grey,
      A200: white
    }
  },
  overrides: {}
}
