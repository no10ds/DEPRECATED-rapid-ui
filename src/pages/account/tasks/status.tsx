import { Card, Row, BadgeNumber, Button, TextField, Select, Link } from '@/components'
import AccountLayout from '@/components/Layout/AccountLayout'
import SimpleTable from '@/components/SimpleTable/SimpleTable'
import { FormControl, Typography } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'

function StatusPage() {
  return (
    <Card action={<Button color="primary">Generate Schema</Button>}>
      <Typography variant="h2" gutterBottom>
        Jobs
      </Typography>

      <SimpleTable
        list={[
          [
            { children: <>UPLOAD</> },
            { children: <>automotive</> },
            { children: <>car_sales</> },
            { children: <>1</> },
            { children: <ErrorIcon /> },
            { children: <>Validation</> },
            { children: <>f304d1e3-e400-42c4-a96a-1f3ded641bb5</> },
            {
              children: (
                <Link
                  href={`/account/tasks/job/?id=f304d1e3-e400-42c4-a96a-1f3ded641bb5`}
                >
                  Failure details
                </Link>
              )
            }
          ]
        ]}
        headers={[
          { children: 'Type' },
          { children: 'Domain' },
          { children: 'Dataset' },
          { children: 'Version' },
          { children: 'Status' },
          { children: 'Step' },
          { children: 'Job ID' },
          { children: '' }
        ]}
      />
    </Card>
  )
}

export default StatusPage

StatusPage.getLayout = (page) => <AccountLayout title="Task Status">{page}</AccountLayout>
