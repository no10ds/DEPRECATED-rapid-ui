import { createTheme, Shadows } from '@mui/material/styles'
import { Colors } from './types'

const colors: Colors = {
  black: '#000',
  white: '#fff',
  blue1: '#C6D6F',
  blue2: '#769CC1',
  grey1: '#E9EAEC',
  grey2: '#AEAEAE',
  grey3: '#666',
  grey4: '#F5F6F6'
}

const fonts = {
  default: ['Poppins', 'sans-serif']
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
      fontWeight: 600,
      fontSize: 22,
      lineHeight: '150%;',
      letterSpacing: '0.15px',
      '&.MuiTypography-gutterBottom': {
        marginBottom: 10
      }
    },
    body2: {
      fontSize: 16,
      fontWeight: 600,
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

  shadows: Array(25).fill('none') as Shadows,
  shape: {
    borderRadius: 5
  },
  spacing: [0, 5, 10, 16, 30, 60, 110],
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Poppins-Regular'), url(/fonts/Poppins-Regular.ttf) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }

        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src: url(/fonts/Poppins-SemiBold.ttf) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }

        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: url(/fonts/Poppins-Bold.ttf) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 16
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 16
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 16
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          '.MuiFormControlLabel-label': {
            fontSize: 16
          }
        }
      }
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          body1: 'p',
          body2: 'p'
        }
      }
    }
  }
})

export default theme
