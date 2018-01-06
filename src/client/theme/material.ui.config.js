// Use this for reference: https://material-ui-next.com/customization/themes/
// An example for styling a new component: https://github.com/mui-org/material-ui/blob/v1-beta/src/Table/TableCell.js

import grey from 'material-ui/colors/grey';

import Styles from '../styles/app.scss'
const { primaryColor, borderColor, white } = Styles;

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
  overrides: {
    MuiCardContent: {
      root: {
        padding: `10px 0 10px 0`
      }
    },
    MuiPaper: {
      root: {
        borderBottom: `1px solid ${borderColor}`,
        marginBottom: 10
      },
      rounded: {
        borderRadius: 0
      },
      shadow2: {
        boxShadow: `0 0 0 transparent`
      }
    }
  }
}
