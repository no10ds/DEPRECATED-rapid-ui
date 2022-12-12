import { Container, ContainerProps } from '@mui/material'
import { Poppins } from '@next/font/google'

const myFont = Poppins({
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

type Props = ContainerProps

const Template = ({ children, ...props }: Props) => (
  <Container maxWidth="xl" {...props}>
    <style jsx global>
      {`
        :root {
          --font-poppins: ${myFont.style.fontFamily};
        }
        body {
          min-height: 100vh;
        }
      `}
    </style>
    <main>{children}</main>
  </Container>
)

export default Template
