// Use this for reference: https://material-ui-next.com/customization/themes/
// An example for styling a new component: https://github.com/mui-org/material-ui/blob/v1-beta/src/Table/TableCell.js

import grey from "material-ui/colors/grey";

import Styles from "../styles/app.scss";
const {
  bodyFont,
  primaryColor,
  borderColor,
  letterSpacing,
  secondaryBackgroundColor,
  tabUnselected,
  white
} = Styles;

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
        letterSpacing: letterSpacing,
        textTransform: 'none'
      },
      flatPrimary: {
        borderRadius: 0,
        border: `1px solid ${white}`,
        boxShadow: `0 0 0 0 transparent`,
        color: white,
        fontSize: 18,
        '&:hover': {
          backgroundColor: white,
          color: primaryColor
        }
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
        padding: `0 0 10px 0`
      }
    },
    MuiGrid: {
      typeContainer: {
        paddingBottom: 20,
        paddingTop: 20
      }
    },
    MuiInput: {
      underline: {
        '&:after': {
          backgroundColor: primaryColor
        },
        '&:before': {
          backgroundColor: primaryColor
        }
      }
    },
    MuiList: {
      padding: {
        paddingBottom: 0,
        paddingTop: 0
      }
    },
    MuiPaper: {
      root: {
        borderBottom: `1px solid ${borderColor}`,
        padding: `15px 10px`,
        overflow: 'hidden'
      },
      rounded: {
        borderRadius: 0
      }
    },
    MuiPopover: {
      paper: {
        padding: 0
      }
    },
    MuiSelect: {
      select: {
        paddingLeft: 10
      }
    },
    MuiTab: {
      textColorPrimary: {
        backgroundColor: tabUnselected,
        color: primaryColor,
        minWidth: 40,
        maxWidth: 'initial'
      },
      textColorPrimarySelected: {
        backgroundColor: primaryColor,
        color: white
      },
      label: {
        fontSize: '18px !important',
        textTransform: 'none'
      },
      wrapper: {
        flexDirection: 'inherit'
      }
    },
    MuiTabIndicator: {
      colorPrimary: {
        display: 'none'
      }
    },
    MuiTableCell: {
      head: {
        borderColor: primaryColor,
        color: primaryColor,
        fontFamily: bodyFont,
        fontSize: '1em',
        fontWeight: 700,
        padding: 10
      },
      body: {
        fontSize: '1em',
        padding: 10
      },
      numeric: {
        textAlign: 'center'
      },
      root: {
        borderBottomColor: secondaryBackgroundColor,
        borderBottomWidth: 2
      }
    }
  }
}
