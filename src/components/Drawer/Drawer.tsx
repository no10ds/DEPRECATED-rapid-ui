import {
  Divider,
  Drawer as MuiDrawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material'
import { ComponentProps, ReactNode } from 'react'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import InboxIcon from '@mui/icons-material/MoveToInbox'

type Props = ComponentProps<typeof MuiDrawer>

export default function Drawer(props: Props) {
  return (
    <MuiDrawer
      variant="permanent"
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box' }
      }}
      {...props}
    >
      <Toolbar />
      <Divider />
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={<Typography variant="body2">{text}</Typography>} />
          </ListItemButton>
        </ListItem>
      ))}
    </MuiDrawer>
  )
}
