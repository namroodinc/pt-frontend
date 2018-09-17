// Use this for reference: https://material-ui-next.com/customization/themes/

import Styles from '../styles/app.scss'
const { backgroundColor, borderColor, textColor } = Styles;

export default {
  palette: {
    primary: {
      light: textColor,
      main: textColor,
      dark: textColor,
      contrastText: textColor
    }
  },
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: '0 0 0 0 transparent'
      },
      containedPrimary: {
        backgroundColor,
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
    }
  }
}
