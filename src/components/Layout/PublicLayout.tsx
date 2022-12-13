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
  background: linear-gradient(204.28deg, #e6cece 14.76%, #d1ccf4 97.11%);
  /* max-width: 1050px; */

  .promo,
  .main-content {
    padding: ${(p) => p.theme.spacing(4)};
    width: 100%;
  }

  .promo {
    max-width: 600px;
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
    border-radius: inherit;

    max-width: 915px;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
    margin: -3px 0px -3px -${overlap}px;
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

        <Typography gutterBottom variant="body2">
          Project rAPId aims to create consistent, secure, interoperable data storage and
          sharing interfaces (APIs) that enable departments to discover, manage and share
          data and metadata amongst themselves.
        </Typography>

        <Typography gutterBottom variant="body2">
          This will improve the government's use of data by making it more scalable,
          secure, and resilient, helping to match the rising demand for good-quality
          evidence in the design, delivery, and evaluation of public policy.
        </Typography>

        <Typography gutterBottom variant="body2">
          The project aims to deliver a replicable template for simple data storage
          infrastructure in AWS, a RESTful API and custom frontend UI to ingest and share
          named, standardised datasets.
        </Typography>

        <Box sx={{ textAlign: 'center' }}>
          <ConnectionRelation />
        </Box>
      </div>
      <Box className="main-content">{children}</Box>
      <Logo className="logo" />
    </Columns>
  </Template>
)

export default PublicLayout
