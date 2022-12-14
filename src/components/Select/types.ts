import { Select } from '@mui/material'
import { ComponentProps } from 'react'

type SelectProps =
  | {
      checkboxes?: never
    }
  | {
      checkboxes: true
    }

export type Props = {
  label: string
  fullWidth?: boolean
  data?: string[]
  error?: string
} & SelectProps &
  ComponentProps<typeof Select>

export type CheckBoxValue = string[]
