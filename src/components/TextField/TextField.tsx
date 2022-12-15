import { TextField as MuiTextField, styled, alpha } from '@mui/material'
import { ComponentProps } from 'react'

const StyledTextField = styled(MuiTextField)<ComponentProps<typeof MuiTextField>>`
  .MuiInputAdornment-sizeSmall .MuiTypography-root,
  .MuiInputBase-root,
  .MuiFormLabel-root {
    font-size: 16px;
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: ${(p) => alpha(p.theme.colors.black, 0.23)};
  }
`

export default StyledTextField
