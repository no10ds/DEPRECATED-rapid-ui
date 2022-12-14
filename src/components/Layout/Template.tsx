import { Container, ContainerProps, styled } from '@mui/material'

type Props = { align?: 'left' | 'center' | 'right' } & ContainerProps

const Main = styled('main')<Props>`
  display: flex;
  align-items: ${(p) => p.align};
  justify-content: ${(p) => p.align};
  min-height: 100vh;
`

const Template = ({ children, align = 'center', ...props }: Props) => (
  <Container maxWidth="xl" {...props}>
    <Main align={align}>{children}</Main>
  </Container>
)

export default Template
