import { CSSProperties } from 'react'
/* eslint-disable @typescript-eslint/no-empty-interface */

export type Colors = {
  white: CSSProperties['color']
  blue1: CSSProperties['color']
  blue2: CSSProperties['color']
  grey1: CSSProperties['color']
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    small: true
    h2: true
    h3: true
    h4: false
    h5: false
    h6: false
    subtitle1: false
    subtitle2: false
    body2: true
    overline: false
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariantsOptions {
    // display?: CSSProperties
  }

  interface Theme {
    colors: Colors
  }

  interface ThemeOptions {
    colors: Colors
  }

  interface BreakpointOverrides {
    sm: false
  }
}