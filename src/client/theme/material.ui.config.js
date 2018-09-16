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
        backgroundColor
      },
      disabled: {
        borderColor: '#F06292',
        color: '#F06292 !important'
      },
      outlined: {
        borderColor: textColor
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
    }
  }
}
