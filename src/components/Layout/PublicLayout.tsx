import { Box, styled, Typography } from '@mui/material'
import { Template } from '@/components'
import { TimeFast, ConnectionRelation } from '@/components/Icon'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof Box>

const Columns = styled(Box)`
  display: flex;
  min-height: 100vh;

  .promo,
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding: ${(p) => p.theme.spacing(4)};
  }

  .promo {
    color: ${(p) => p.theme.colors.white};
    svg {
      font-size: 210px;
    }
  }
  .title {
    display: flex;
    align-items: center;
    margin-bottom: ${(p) => p.theme.spacing(4)};
    gap: ${(p) => p.theme.spacing(4)};
    position: absolute;
    top: ${(p) => p.theme.spacing(4)};
    left: ${(p) => p.theme.spacing(4)};
    .logo {
      color: ${(p) => p.theme.colors.white};
      font-size: 45px;
      gap: 10px;
    }
  }
  .content {
    background-color: ${(p) => p.theme.colors.grey1};
    flex-grow: 1;

    border-radius: 5px 0 0 5px;

    &:after {
      content: 'normal';
      position: absolute;
      inset: 0px -100vw 0px 0px;
      z-index: -1;
      background-color: inherit;
      border-radius: inherit;
      overflow: hidden;
      box-shadow: -10px 0px 10px 1px rgba(0, 0, 0, 0.2);
    }
  }
`

const PublicLayout = ({ children, ...props }: Props) => (
  <Template>
    <style jsx global>
      {`
        body {
          // background: linear-gradient(
          //     243.18deg,
          //     #fdc5c5 25.45%,
          //     rgba(242, 152, 222, 0) 100%
          //   ),
          //   linear-gradient(243.43deg, #ffa5a5 32.96%, rgba(255, 255, 255, 0) 82.03%),
          //   #f39494;
          background-color: #769cc1;
        }
      `}
    </style>
    <Columns {...props}>
      <div className="promo">
        <div className="title">
          <TimeFast className="logo" />
          <Typography variant="h1" component="h1">
            Rapid API
          </Typography>
        </div>

        <div className="middle-content">
          <Typography sx={{ mb: 3 }}>
            Join the platform to get more exciting features
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <ConnectionRelation />
          </Box>
        </div>
      </div>
      <Box className="content">
        <div className="middle-content">{children}</div>
      </Box>
    </Columns>
  </Template>
)

export default PublicLayout
