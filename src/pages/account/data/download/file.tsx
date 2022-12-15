import {
  Card,
  SimpleTable,
  AccountLayout,
  Button,
  Select,
  Link,
  Row,
  TextField
} from '@/components'
import { CrossCircle } from '@/components/Icon'
import { TableCellProps, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const renderTable = (
  list: {
    name: string
    value: string
  }[] = []
) => (
  <SimpleTable
    sx={{ mb: 4 }}
    list={[
      ...list.map<TableCellProps[]>(({ name, value }) => [
        { children: name, component: 'th' },
        { children: <Typography variant="body2">{value}</Typography> }
      ])
    ]}
  />
)

function FilePage() {
  const router = useRouter()
  const { dataset, version } = router.query

  return (
    <Card action={<Button color="primary">Download</Button>}>
      <Typography variant="h2" gutterBottom>
        Dataset Overview
      </Typography>
      {renderTable([
        { name: 'Domain', value: 'automotive' },
        { name: 'Dataset', value: dataset?.toString() },
        { name: 'Version', value: version?.toString() },
        { name: 'Last updated	', value: '15 Sep 2022 at 11:18:37' },
        { name: 'Number of Rows', value: '990300' },
        { name: 'Number of Columns', value: '17' }
      ])}
      <Typography variant="h2" gutterBottom>
        Columns
      </Typography>
      <SimpleTable
        sx={{ mb: 4 }}
        headers={[
          { children: 'Name' },
          { children: 'Data Type' },
          { children: 'Allows Null' },
          { children: 'Allows Max' },
          { children: 'Allows Min' }
        ]}
        list={[
          [
            { children: 'brand' },
            { children: 'object' },
            { children: 'True' },
            { children: '-' },
            { children: '-' }
          ],
          [
            { children: 'name' },
            { children: 'object' },
            { children: 'True' },
            { children: '-' },
            { children: '-' }
          ],
          [
            { children: 'bodytype' },
            { children: 'object' },
            { children: 'True' },
            { children: '-' },
            { children: '-' }
          ]
        ]}
      />
      <Typography variant="h2" gutterBottom>
        Format
      </Typography>
      <Row>
        <Select label="Data format" data={['csv', 'json']} />
      </Row>

      <Typography variant="h2" gutterBottom>
        Query (optional)
      </Typography>

      <Typography variant="body2" gutterBottom>
        <Link
          href="https://github.com/no10ds/rapid-api/blob/main/docs/guides/usage/usage.md#query-structure"
          target="_blank"
        >
          query writing guide
        </Link>
      </Typography>

      <Row>
        <TextField
          fullWidth
          size="small"
          label="select columns"
          variant="outlined"
          placeholder="column1, avg(column2)"
        />
      </Row>

      <Row>
        <TextField
          fullWidth
          size="small"
          label="filter"
          variant="outlined"
          placeholder="column >= 10"
        />
      </Row>

      <Row>
        <TextField
          fullWidth
          size="small"
          label="group by columns"
          variant="outlined"
          placeholder="column1, column3"
        />
      </Row>

      <Row>
        <TextField
          fullWidth
          size="small"
          label="aggregation conditions"
          variant="outlined"
          placeholder="avg(column2) <= 15"
        />
      </Row>

      <Row>
        <TextField
          fullWidth
          size="small"
          label="row limit"
          variant="outlined"
          placeholder="30"
        />
      </Row>
    </Card>
  )
}

export default FilePage

FilePage.getLayout = (page) => <AccountLayout title="Download">{page}</AccountLayout>
