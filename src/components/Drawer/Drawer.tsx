import { Drawer as MuiDrawer } from '@mui/material'
import { ComponentProps, ReactNode } from 'react'

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
      11Lorem ipsum dolor sit amet consectetur adipisicing elit. Id est molestiae rem,
      repudiandae natus, voluptatibus perspiciatis quo corporis assumenda facilis eos
      repellat iste deleniti aspernatur soluta cum ea aut reiciendis?
    </MuiDrawer>
  )
}
