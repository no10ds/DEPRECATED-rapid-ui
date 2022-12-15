import {
  Card,
  Row,
  BadgeNumber,
  Button,
  TextField,
  Select,
  Link,
  SimpleTable,
  AccountLayout
} from '@/components'
import { CrossCircle, Check, HourGlass } from '@/components/Icon'
import { Typography } from '@mui/material'

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
            { children: <CrossCircle /> },
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
          ],
          [
            { children: <>UPLOAD</> },
            { children: <>automotive</> },
            { children: <>car_sales</> },
            { children: <>1</> },
            { children: <Check /> },
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
          ],
          [
            { children: <>UPLOAD</> },
            { children: <>automotive</> },
            { children: <>car_sales</> },
            { children: <>1</> },
            { children: <HourGlass /> },
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
