import { Box, styled, Typography } from '@mui/material'
import { Template } from '@/components'
import { TimeFast, ConnectionRelation, Logo } from '@/components/Icon'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof Box>

const borderRadios = 40
const overlap = 50

const Columns = styled(Box)`
  display: flex;
  /* min-height: 100vh; */

  min-height: auto;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  backdrop-filter: blur(68px);
  border-radius: ${borderRadios}px;
  overflow: hidden;
  background: linear-gradient(204.28deg, #e6cece 14.76%, #d1ccf4 97.11%);
  /* max-width: 1050px; */

  .promo,
  .main-content {
    padding: ${(p) => p.theme.spacing(4)};
    width: 100%;
  }

  .promo {
    max-width: 342px;
    color: ${(p) => p.theme.colors.white};
    padding-right: calc(${(p) => p.theme.spacing(4)} + ${overlap}px);
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    svg {
      font-size: 210px;
    }
  }

  .main-content {
    background-color: ${(p) => p.theme.colors.grey1};
    flex-grow: 1;
    border-radius: ${borderRadios}px 0 0 ${borderRadios}px;
    margin-left: -${overlap}px;
    max-width: 915px;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  }

  .logo {
    position: absolute;
    bottom: 0px;
    right: 20px;
    font-size: 120px;
  }
`

const PublicLayout = ({ children, ...props }: Props) => (
  <Template>
    <Logo className="logo" />
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
      <div className="promo">
        <div className="title">
          {/* <img src="img/logo.png" className="logo" /> */}
          {/* <TimeFast className="logo" /> */}
          {/* <Typography variant="h1" component="h1">
            Rapid API
          </Typography> */}
        </div>

        <Typography sx={{ mb: 3 }}>
          Join the platform to get more exciting features
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <ConnectionRelation />
        </Box>
      </div>
      <Box className="main-content">{children}</Box>
    </Columns>
  </Template>
)

export default PublicLayout
