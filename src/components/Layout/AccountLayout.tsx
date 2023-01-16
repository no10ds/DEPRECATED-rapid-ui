import { Box, Container, LinearProgress, styled, Toolbar } from '@mui/material'
import { ComponentProps, useEffect, useState } from 'react'
import { AppBar, Drawer } from '@/components'
import Router from 'next/router'
import { getAuth } from '@/service'
import { useQuery } from '@tanstack/react-query'

type Props = { title?: string } & ComponentProps<typeof Box>

const drawerWidth = 244

const Layout = styled(Box)`
  .columns {
    display: flex;
    width: 100%;
  }

  main {
    width: 100%;
  }

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
    width: 100%;
  }
  .MuiDrawer-paper {
    width: ${drawerWidth}px;
  }
`

const AccountLayout = ({ children, title, ...props }: Props) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAuthUrl = async () => {
      const result = await fetch('/api/oauth2/')
      if (result.ok) {
        setIsLoading(false)
      } else {
        Router.replace({
          pathname: '/login'
        })
      }
    }

    fetchAuthUrl().catch(() => {
      Router.replace({
        pathname: '/login'
      })
    })
  })

  if (isLoading) {
    return <LinearProgress />
  }

  return (
    <Layout>
      <AppBar
        title={title}
        sx={{
          marginLeft: `${drawerWidth}px`,
          width: `calc(100% - ${drawerWidth}px)`
        }}
      />

      <Container maxWidth="xl">
        <Box className="columns" {...props}>
          <Drawer
            variant="permanent"
            open
            list={[
              { text: 'User Management' },
              {
                text: 'Create User',
                href: '/subject/create/',
                icon: 'UserAdd'
              },
              {
                text: 'Modify User',
                href: '/subject/modify/',
                icon: 'Pencil'
              },
              { text: 'Data Management' },
              {
                text: 'Upload data',
                href: '/data/upload/',
                icon: 'ArrowUp'
              },
              {
                text: 'Download data',
                href: '/data/download/',
                icon: 'CloudDownload'
              },
              { text: 'Schema Management' },
              {
                text: 'Create Schema',
                href: '/schema/create/',
                icon: 'AppsAdd'
              },
              {
                text: 'Task Management'
              },
              {
                text: 'Task Status',
                href: '/tasks/',
                icon: 'BarsProgress'
              }
            ]}
          />
          <Box className="main-content">
            <Toolbar />
            {children}
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export default AccountLayout
