import { Box, styled, Toolbar, Typography } from '@mui/material'
import { Template } from '@/components'
import { Logo, GovLogo, Saly } from '@/components/Icon'
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

        {/* <div className="sidebar">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, libero? Eligendi
        dolorem unde illo! Sit quis eligendi quidem excepturi cum consectetur saepe
        ducimus commodi praesentium quos beatae, amet eaque ipsum!
      </div> */}
        <Box className="main-content">
          <Toolbar />
          {/* {title && (
          <div className="header">
            <Typography variant="h1">{title}</Typography>
          </div>
        )} */}
          {children}
        </Box>
        {/* <Logo className="logo" /> */}
      </Columns>
    </Template>
  </>
)

export default AccountLayout
