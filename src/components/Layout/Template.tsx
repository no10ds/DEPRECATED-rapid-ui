import { Container, ContainerProps } from '@mui/material'

type Props = ContainerProps

const Template = ({ children, ...props }: Props) => (
  <Container maxWidth="xl" {...props}>
    <main>{children}</main>
  </Container>
)

export default Template
