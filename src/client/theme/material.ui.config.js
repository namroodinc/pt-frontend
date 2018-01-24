// Use this for reference: https://material-ui-next.com/customization/themes/
// An example for styling a new component: https://github.com/mui-org/material-ui/blob/v1-beta/src/Table/TableCell.js

import grey from "material-ui/colors/grey";

import Styles from "../styles/app.scss";
const { bodyFont, primaryColor, borderColor, letterSpacing, white } = Styles;

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
  typography: {
    fontFamily: bodyFont
  },
  overrides: {
    MuiButton: {
      root: {
        fontWeight: 600,
        letterSpacing: letterSpacing
      },
      raisedPrimary: {
        borderRadius: 0,
        boxShadow: `0 0 0 transparent`
      }
    },
    MuiCardActions: {
      root: {
        height: 'auto',
        paddingLeft: 0,
        paddingRight: 0
      },
      action: {
        marginLeft: 0,
        marginRight: 10
      }
    },
    MuiCardContent: {
      root: {
        padding: `10px 0 10px 0`
      }
    },
    MuiPaper: {
      root: {
        borderBottom: `0px solid ${borderColor}`,
        marginBottom: 30
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
