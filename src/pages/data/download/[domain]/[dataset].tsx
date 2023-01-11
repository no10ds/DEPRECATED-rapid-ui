import {
  AccountLayout,
  Button,
  Card,
  Link,
  Row,
  Select,
  SimpleTable,
  TextField,
  Alert
} from '@/components'
import { asVerticalTableList } from '@/lib'
import { getDatasetInfo, queryDataset } from '@/service'
import { DataFormats } from '@/service/types'
import { Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'

function DownloadDataset() {
  const router = useRouter()
  const { domain, dataset, version } = router.query
  const [dataFormat, setDataFormat] = useState<DataFormats>('csv')

  const { isLoading: isDatasetInfoLoading, data: datasetInfoData } = useQuery(
    ['datasetInfo', domain, dataset, version ? version : 0],
    getDatasetInfo
  )

  const { isLoading, mutate, error } = useMutation<
    Response,
    Error,
    { path: string; dataFormat: DataFormats; data: unknown }
  >({
    mutationFn: queryDataset,
    onSuccess: async (response, { dataFormat }) => {
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `${domain}_${dataset}_${version}.${dataFormat}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    }
  })

  if (isDatasetInfoLoading) {
    return <p>Loading...</p>
  }

  return (
    <Card
      action={
        <Button
          color="primary"
          onClick={() =>
            mutate({
              path: `${domain}/${dataset}/query?version=${version}`,
              dataFormat,
              data: {}
            })
          }
          loading={isLoading}
        >
          Download
        </Button>
      }
    >
      <Typography variant="h2" gutterBottom>
        Dataset Overview
      </Typography>

      <SimpleTable
        list={asVerticalTableList([
          { name: 'Domain', value: domain as string },
          { name: 'Dataset', value: dataset as string },
          { name: 'Version', value: version as string },
          { name: 'Last updated	', value: datasetInfoData.metadata.last_updated },
          {
            name: 'Number of Rows',
            value: datasetInfoData.metadata.number_of_rows.toString()
          },
          {
            name: 'Number of Columns',
            value: datasetInfoData.metadata.number_of_columns.toString()
          }
        ])}
      />

      <Typography variant="h2" gutterBottom>
        Columns
      </Typography>
      <SimpleTable
        sx={{ mb: 4 }}
        headers={[
          { children: 'Name' },
          { children: 'Data Type' },
          { children: 'Allows Null' },
          { children: 'Max' },
          { children: 'Min' }
        ]}
        list={datasetInfoData.columns.map((column) => {
          return [
            { children: column.name },
            { children: column.data_type },
            { children: column.allow_null ? 'True' : 'False' },
            { children: '-' },
            { children: '-' }
          ]
        })}
      />
      <Typography variant="h2" gutterBottom>
        Format
      </Typography>
      <Row>
        <Select
          label="Data format"
          data={['csv', 'json']}
          value={dataFormat}
          onChange={(e) => setDataFormat(e.target.value as DataFormats)}
        />
      </Row>

      <Typography variant="h2" gutterBottom>
        Query (optional)
      </Typography>

      <Typography variant="body2" gutterBottom>
        For further information on writing queries consult the{' '}
        <Link
          href="https://github.com/no10ds/rapid-api/blob/main/docs/guides/usage/usage.md#query-structure"
          target="_blank"
        >
          query writing guide
        </Link>
      </Typography>

      <Row>
        <Typography variant="caption">Select Columns</Typography>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="column1, avg(column2)"
        />
      </Row>

      <Row>
        <Typography variant="caption">Filter</Typography>
        <TextField fullWidth size="small" variant="outlined" placeholder="column >= 10" />
      </Row>

      <Row>
        <Typography variant="caption">Group by Columns</Typography>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="column1, column3"
        />
      </Row>

      <Row>
        <Typography variant="caption">Aggregation Conditions</Typography>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="avg(column2) <= 15"
        />
      </Row>

      <Row>
        <Typography variant="caption">Row Limit</Typography>
        <TextField fullWidth size="small" variant="outlined" placeholder="30" />
      </Row>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error?.message}
        </Alert>
      )}
    </Card>
  )
}

export default DownloadDataset

DownloadDataset.getLayout = (page) => (
  <AccountLayout title="Download">{page}</AccountLayout>
)
