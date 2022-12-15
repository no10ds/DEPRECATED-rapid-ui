import { Card, BadgeNumber, Button } from '@/components'
import AccountLayout from '@/components/Layout/AccountLayout'
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'

function Step1Page() {
  return (
    <Card
      action={
        <Button color="primary" href="/account/user//modify/success/">
          Modify
        </Button>
      }
    >
      <Typography variant="h2" gutterBottom>
        <BadgeNumber label="2" /> Select permissions for demo_read_public
      </Typography>

      <Typography gutterBottom>Management permissions</Typography>
      {['Data', 'User'].map((name) => (
        <Box sx={{ mb: 1 }} key={name}>
          <FormControlLabel label={name} control={<Checkbox />} />
        </Box>
      ))}

      <Typography gutterBottom>Global read permissions</Typography>
      {['ALL', 'PUBLIC', 'PRIVATE', 'NONE'].map((name) => (
        <Box sx={{ mb: 1 }} key={name}>
          <FormControlLabel label={name} control={<Checkbox />} />
        </Box>
      ))}

      <Typography gutterBottom>Global write permissions</Typography>
      {['Claude qa', 'Test', 'Pentest domain', 'Test e2e protected'].map((name) => (
        <Box sx={{ mb: 1 }} key={name}>
          <FormControlLabel label={name} control={<Checkbox />} />
        </Box>
      ))}

      <Typography gutterBottom>Write protected permissions</Typography>
      {['Claude qa', 'Test', 'Pentest domain', 'Test e2e protected'].map((name) => (
        <Box sx={{ mb: 1 }} key={name}>
          <FormControlLabel label={name} control={<Checkbox />} />
        </Box>
      ))}
    </Card>
  )
}

export default Step1Page

Step1Page.getLayout = (page) => <AccountLayout title="Modify User">{page}</AccountLayout>
