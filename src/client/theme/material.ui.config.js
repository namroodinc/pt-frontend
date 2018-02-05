// Use this for reference: https://material-ui-next.com/customization/themes/
// An example for styling a new component: https://github.com/mui-org/material-ui/blob/v1-beta/src/Table/TableCell.js

import grey from "material-ui/colors/grey";

import Styles from "../styles/app.scss";
const { bodyFont, primaryColor, borderColor, letterSpacing, textColor, white } = Styles;

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
        borderBottom: `1px solid ${borderColor}`,
        padding: 10
      },
      rounded: {
        borderRadius: 0
      },
      shadow2: {
        boxShadow: `0 0 0 transparent`
      }
    },
    MuiTab: {
      rootPrimary: {
        backgroundColor: textColor,
        color: white
      },
      rootPrimarySelected: {
        backgroundColor: white,
        color: textColor,
        paddingLeft: 15,
        paddingRight: 15
      },
      label: {
        fontSize: '18px !important',
        textTransform: 'none'
      },
      labelContainer: {
        paddingLeft: '10px !important',
        paddingRight: '0 !important'
      },
      wrapper: {
        flexDirection: 'inherit'
      }
    },
    MuiTabIndicator: {
      colorPrimary: {
        backgroundColor: textColor,
        height: 4
      }
    }
  }
}
