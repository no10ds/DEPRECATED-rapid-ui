import { createTheme } from '@mui/material/styles'
import { Colors } from './types'

const colors: Colors = {
  white: '#fff',
  blue1: '#C6D6F',
  blue2: '#769CC1',
  grey1: '#e9eaec'
}

const fonts = {
  default: ['var(--font-poppins)', 'sans-serif']
}

const theme = createTheme({
  colors,
  palette: {
    mode: 'light'
  },
  typography: {
    fontFamily: fonts.default.join(','),
    h1: {
      fontWeight: 700,
      fontSize: 30,
      lineHeight: '123.5%',
      letterSpacing: '-1px',
      '&.MuiTypography-gutterBottom': {
        marginBottom: 16
      }
    },
    h2: {
      fontWeight: 700,
      fontSize: 22,
      lineHeight: '123.5%',
      letterSpacing: '-1px',
      '&.MuiTypography-gutterBottom': {
        marginBottom: 16
      }
    },
    h3: {
      fontWeight: 700,
      fontSize: 16,
      lineHeight: '123.5%',
      letterSpacing: '-1px',
      '&.MuiTypography-gutterBottom': {
        marginBottom: 16
      }
    },
    body1: {
      fontWeight: 400,
      fontSize: 22,
      lineHeight: '150%;',
      letterSpacing: '0.15px',
      '&.MuiTypography-gutterBottom': {
        marginBottom: 10
      }
    },
    body2: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: '150%;',
      letterSpacing: '0.15px',
      '&.MuiTypography-gutterBottom': {
        marginBottom: 10
      }
    },
    h4: undefined,
    h5: undefined,
    h6: undefined,
    subtitle1: undefined,
    subtitle2: undefined,
    overline: undefined
  },
  spacing: [0, 5, 10, 16, 30, 60, 110]
})

export default theme
