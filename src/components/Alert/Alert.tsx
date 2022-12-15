import { Alert as MuiAlert, AlertTitle } from '@mui/material'
import { ComponentProps } from 'react'

type Props = { title?: string } & ComponentProps<typeof MuiAlert>

function Alert({ title, ...props }: Props) {
  return (
    <MuiAlert {...props}>
      {title && <AlertTitle>{title}</AlertTitle>}
      Alert
    </MuiAlert>
  )
}

export default Alert
