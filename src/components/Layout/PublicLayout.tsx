import { Container, ContainerProps } from '@mui/material'
import { Template } from '@/components'

type Props = ContainerProps

const PublicLayout = ({ children, ...props }: Props) => (
  <Template>
    <Container maxWidth="xl" {...props}>
      {children}
    </Container>
  </Template>
)

export default PublicLayout
