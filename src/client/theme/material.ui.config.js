// Use this for reference: https://material-ui-next.com/customization/themes/

import Styles from '../styles/app.scss'
const { backgroundColor, borderColor, bodyFont, textColor } = Styles;

export default {
  palette: {
    primary: {
      light: textColor,
      main: backgroundColor,
      dark: textColor,
      contrastText: textColor
    }
  },
  typography: {
    fontFamily: bodyFont
  },
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: '0 0 0 0 transparent'
      },
      containedPrimary: {
        backgroundColor,
        fontWeight: 700,
        '&:hover': {
          backgroundColor: borderColor
        }
      },
      disabled: {
        borderColor: '#F06292',
        color: '#F06292 !important'
      },
      outlined: {
        borderColor: textColor
      }
    },
    MuiFormControlLabel: {
      label: {
        color: backgroundColor
      },
      root: {
        marginLeft: 0,
        marginRight: 20
      }
    },
    MuiIconButton: {
      root: {
        height: 35,
        width: 35
      }
    },
    MuiInput: {
      root: {
        color: textColor
      },
      underline: {
        '&:before': {
          borderColor: `${borderColor} !important`
        }
      }
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: borderColor
      }
    },
    MuiSvgIcon: {
      root: {
        fill: backgroundColor
      }
    },
    MuiTab: {
      label: {
        fontSize: `18px !important`,
        fontWeight: 700,
        textTransform: 'none'
      },
      root: {
        maxWidth: 'none'
      },
      textColorPrimary: {
        color: borderColor
      }
    },
    MuiTabs: {
      root: {
        marginBottom: 10
      },
      indicator: {
        height: 3
      }
    }
  }
}
