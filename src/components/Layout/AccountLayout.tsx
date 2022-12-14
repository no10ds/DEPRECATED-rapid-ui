import { Box, styled, Toolbar } from '@mui/material'
import { Template } from '@/components'
import { ComponentProps } from 'react'
import { AppBar, Drawer } from '@/components'

type Props = { title?: string } & ComponentProps<typeof Box>

const drawerWidth = 224

const Columns = styled(Box)`
  display: flex;

  .sidebar {
    background-color: #ccc;
    position: fixed;
    width: ${drawerWidth}px;
    top: 0;
    left: 0;
  }

  .main-content {
    margin-left: ${drawerWidth}px;
    padding: ${(p) => p.theme.spacing(3)};
  }
  .MuiDrawer-paper {
    width: ${drawerWidth}px;
  }
`

const AccountLayout = ({ children, title, ...props }: Props) => (
  <>
    <AppBar
      title={title}
      sx={{
        marginLeft: `${drawerWidth}px`,
        width: `calc(100% - ${drawerWidth}px)`
      }}
    />
    <Template disableGutters sx={{ ml: 0 }}>
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
        <Drawer variant="permanent" open />
        <Box className="main-content">
          <Toolbar />
          {children}
        </Box>
      </Columns>
    </Template>
  </>
)

export default AccountLayout
