// Use this for reference: https://material-ui-next.com/customization/themes/

import Styles from '../styles/app.scss'
const { borderColor, textColor } = Styles;

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
