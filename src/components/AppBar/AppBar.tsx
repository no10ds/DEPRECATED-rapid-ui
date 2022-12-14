import * as React from 'react'
import {
  IconButton,
  Typography,
  Toolbar,
  AppBar as MuiAppBar,
  Menu,
  styled
} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import { ComponentProps } from 'react'

type Props = { title?: string } & ComponentProps<typeof MuiAppBar>

const MenuBar = styled(MuiAppBar)`
  background-color: ${(p) => p.theme.colors.grey1};
  color: ${(p) => p.theme.colors.black};
`

export default function AppBar({ title, ...props }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <MenuBar position="fixed" {...props}>
      <Toolbar>
        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Typography textAlign="center" variant="body2">
                Profile
              </Typography>
            </MenuItem>
            <Typography textAlign="center" variant="body2">
              Account
            </Typography>
          </Menu>
        </div>
      </Toolbar>
    </MenuBar>
  )
}