import { Card, Row, BadgeNumber, Chip, Button, TextField, Select } from '@/components'
import AccountLayout from '@/components/Layout/AccountLayout'
import { FormControl, InputLabel, Stack, Typography } from '@mui/material'

const userType = ['User', 'Client']
const managementPermissions = ['Data', 'User']
const readPermissions = ['All', 'Public', 'Private', 'None']

function CreateUserPage() {
  return (
    <Card action={<Button color="primary">Create subject</Button>}>
      <Typography variant="h2" gutterBottom>
        <BadgeNumber label="1" /> Populate user info
      </Typography>

      <Row>
        <FormControl fullWidth size="small">
          <Select label="Type of User" data={userType} />
        </FormControl>
      </Row>

      <Row>
        <TextField
          label="Name"
          variant="outlined"
          placeholder="e.g. Joe Bloggs"
          size="small"
          fullWidth
        />
      </Row>

      <Row>
        <TextField
          fullWidth
          size="small"
          label="Email"
          type="email"
          variant="outlined"
          placeholder="joe@example.com"
        />
      </Row>

      <Typography variant="h2" gutterBottom>
        <BadgeNumber label="2" /> Select Permissions
      </Typography>

      <Row>
        <Typography component={InputLabel} gutterBottom>
          Management Permissions
        </Typography>

        <Stack direction="row" spacing={1}>
          {managementPermissions.map((type) => {
            return <Chip label={type} key={type} toggle />
          })}
        </Stack>
      </Row>

      <Row>
        <Typography component={InputLabel} gutterBottom>
          Global Read Permissions
        </Typography>
        <Stack direction="row" spacing={1}>
          {readPermissions.map((type) => {
            return <Chip label={type} key={type} toggle />
          })}
        </Stack>
      </Row>
    </Card>
  )
}

export default CreateUserPage

CreateUserPage.getLayout = (page) => (
  <AccountLayout title="Create User">{page}</AccountLayout>
)
