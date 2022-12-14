import { Box, styled, Typography } from '@mui/material'
import { Template } from '@/components'
import { Logo, GovLogo, Saly } from '@/components/Icon'
import { ComponentProps, ReactNode } from 'react'

type Props = { promo?: ReactNode; title: string } & ComponentProps<typeof Box>

const overlap = 50

const Columns = styled(Box)`
  display: flex;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  backdrop-filter: blur(68px);
  border-radius: 40px;
  background: linear-gradient(204.28deg, #e6cece 14.76%, #d1ccf4 97.11%);
  max-width: 1050px;
  width: 100%;

  .promo,
  .main-content {
    padding: ${(p) => p.theme.spacing(4)};
  }

  .header {
    height: 60px;
    display: flex;
    align-items: center;
    margin-bottom: ${(p) => p.theme.spacing(3)};
    svg {
      font-size: 50px;
    }
  }

  .promo {
    color: ${(p) => p.theme.colors.white};
    padding-right: calc(${(p) => p.theme.spacing(4)} + ${overlap}px);
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.55);
    flex-basis: 70%;
    position: relative;
  }

  .main-content {
    background-color: ${(p) => p.theme.colors.grey1};
    flex-grow: 1;
    border-radius: inherit;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
    margin: -3px 0px -3px -${overlap}px;
  }

  .logo {
    position: absolute;
    bottom: 0px;
    right: 20px;
    font-size: 120px;
  }

  .space-icon {
    font-size: 582px;
    position: absolute;
    right: -103px;
    bottom: -143px;
    z-index: 1;
    opacity: 0.8;
    pointer-events: none;
  }
  .content {
    z-index: 2;
    position: relative;
    margin-bottom: 230px;
  }
`

const PublicLayout = ({ children, promo, title, ...props }: Props) => (
  <Template>
    <style jsx global>
      {`
        body {
          background: linear-gradient(
            144.23deg,
            rgba(209, 204, 244, 0.69) -8.57%,
            #e6cece 94.27%
          );
        }
      `}
    </style>
    <Columns {...props}>
      {promo && (
        <div className="promo">
          <div className="header">
            <GovLogo />
          </div>
          <div className="content">{promo}</div>

          <Saly className="space-icon" />
        </div>
      )}
      <Box className="main-content">
        {title && (
          <div className="header">
            <Typography variant="h1">{title}</Typography>
          </div>
        )}
        {children}
      </Box>
      <Logo className="logo" />
    </Columns>
  </Template>
)

export default PublicLayout
