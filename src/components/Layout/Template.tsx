import { Container, ContainerProps, styled } from '@mui/material'

type Props = ContainerProps

const Main = styled('main')`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

const Template = ({ children, ...props }: Props) => (
  <Container maxWidth="xl" {...props}>
    <Main>{children}</Main>
  </Container>
)

export default Template
