import { Card as MuiCard, styled, CardContent } from '@mui/material'
import { ComponentProps, ReactNode } from 'react'

type Props = {
  children: ReactNode
} & ComponentProps<typeof MuiCard>

const StyledCard = styled(MuiCard)`
  width: 100%;
`

const Card = ({ children, ...props }: Props) => {
  return (
    <StyledCard {...props}>
      <CardContent>{children}</CardContent>
    </StyledCard>
  )
}

export default Card
