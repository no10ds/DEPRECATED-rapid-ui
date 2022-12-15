import {
  Card,
  Row,
  BadgeNumber,
  Chip,
  Button,
  TextField,
  Select,
  SimpleTable
} from '@/components'
import AccountLayout from '@/components/Layout/AccountLayout'
import { FormControl, Link, Stack, Typography } from '@mui/material'

const dataTypes = ['Int64', 'Float64', 'object', 'date', 'boolean']

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

      <Row>
        <input name="file" id="file" type="file" />
      </Row>

      <Typography variant="h2" gutterBottom>
        <BadgeNumber label="3" /> Validate the data types for the schema
      </Typography>

      <Typography variant="body2" gutterBottom>
        Consult the schema writing guide for further information.
      </Typography>

      <SimpleTable
        list={[
          [
            { children: 'name' },
            {
              children: (
                <FormControl fullWidth size="small">
                  <Select label="Data type" data={dataTypes} />
                </FormControl>
              )
            },
            {
              children: (
                <FormControl fullWidth size="small">
                  <Select label="Allows Null" data={['true', 'false']} />
                </FormControl>
              )
            },
            {
              children: (
                <TextField size="small" label="Dataset domain" variant="outlined" />
              )
            }
          ],
          [
            { children: 'total_users' },
            {
              children: (
                <FormControl fullWidth size="small">
                  <Select label="Data type" data={dataTypes} />
                </FormControl>
              )
            },
            {
              children: (
                <FormControl fullWidth size="small">
                  <Select label="Allows Null" data={['true', 'false']} />
                </FormControl>
              )
            },
            {
              children: (
                <TextField size="small" label="Dataset domain" variant="outlined" />
              )
            }
          ]
        ]}
        headers={[
          { children: 'Name' },
          { children: 'Data Type' },
          { children: 'Allows Null' },
          { children: 'Partition Index (Optional)' }
        ]}
      />
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
