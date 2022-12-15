import { Card, Row, BadgeNumber, Chip, Button, TextField, Select } from '@/components'
import AccountLayout from '@/components/Layout/AccountLayout'
import { FormControl, Link, Stack, Typography } from '@mui/material'

function UserModifyPage() {
  return (
    <Card action={<Button color="primary">Generate Schema</Button>}>
      <Typography variant="h2" gutterBottom>
        <BadgeNumber label="1" /> Populate dataset properties for the new schema:
      </Typography>

      <Typography gutterBottom>
        Consult the{' '}
        <Link
          href="https://github.com/no10ds/rapid-api/blob/main/docs/guides/usage/schema_creation.md"
          target="_blank"
        >
          schema writing guide
        </Link>
        for further information.
      </Typography>

      <Row>
        <FormControl fullWidth size="small">
          <Select label="sensitivity level" data={['PUBLIC', 'PRIVATE', 'PROTECTED']} />
        </FormControl>
      </Row>

      <Row>
        <TextField fullWidth size="small" label="Dataset domain" variant="outlined" />
      </Row>

      <Row>
        <TextField fullWidth size="small" label="Dataset title" variant="outlined" />
      </Row>

      <Typography variant="h2" gutterBottom>
        <BadgeNumber label="2" /> Upload the data to generate the schema for
      </Typography>

      <input name="file" id="file" type="file" />
    </Card>
  )
}

export default UserModifyPage

UserModifyPage.getLayout = (page) => (
  <AccountLayout
    title="Generate Schema
"
  >
    {page}
  </AccountLayout>
)