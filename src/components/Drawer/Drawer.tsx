import {
  Divider,
  Drawer as MuiDrawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
  Typography
} from '@mui/material'
import { ComponentProps, ReactNode } from 'react'
import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import { Logo } from '@/components/Icon'
import { Icon } from '@/components/Icon/types'
import * as Icons from '@/components/Icon'

type List = {
  text: string
  href?: string
  divider?: boolean
  icon?: Icon
}

type Props = {
  list: List[]
} & ComponentProps<typeof MuiDrawer>

const MenuBar = styled(MuiDrawer)`
  .logo {
    font-size: 105px;
    position: absolute;
  }
`

export default function Drawer({ list, ...props }: Props) {
  return (
    <MenuBar
      variant="permanent"
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box' }
      }}
      {...props}
    >
      <Toolbar>
        <Logo className="logo" />
      </Toolbar>
      <Divider />
      {list.map(({ text, divider, icon }, index) => {
        const Icon = Icons[icon]
        return (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              {icon && <ListItemIcon>{<Icon />}</ListItemIcon>}
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              <ListItemText primary={<Typography variant="body2">{text}</Typography>} />
            </ListItemButton>
            {divider && <Divider />}
          </ListItem>
        )
      })}
    </MenuBar>
  )
}
