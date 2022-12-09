import { createTheme } from '@mui/material/styles'
import { Colors } from './types'

const colors: Colors = {
  white: '#fff',
  blue1: '#C6D6F'
}

const theme = createTheme({
  colors,
  palette: {
    mode: 'light'
  }
})

export default theme
