import { Card, Row, Button, Select } from '@/components'
import ErrorCard from '@/components/ErrorCard/ErrorCard'
import AccountLayout from '@/components/Layout/AccountLayout'
import { getDatasetsUi } from '@/service'
import { FormControl, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function UserModifyPage() {
  const router = useRouter()
  const [dataset, setDataset] = useState<string>('')

  const {
    isLoading: isDatasetsListLoading,
    data: datasetsList,
    error: datasetsError
  } = useQuery(['datasetsList'], getDatasetsUi)

  useEffect(() => {
    if (datasetsList) {
      const firstKey = Object.keys(datasetsList)[0]
      setDataset(`${firstKey}/${datasetsList[firstKey][0].dataset}`)
    }
  }, [datasetsList])

  if (isDatasetsListLoading) {
    return <p>Loading...</p>
  }

  if (datasetsError) {
    return <ErrorCard error={datasetsError as Error} />
  }

  return (
    <Card
      action={
        <Button color="primary" onClick={() => router.push(`/data/download/${dataset}`)}>
          Next
        </Button>
      }
    >
      <Typography variant="h2" gutterBottom>
        Select subject
      </Typography>

      <Row>
        <FormControl fullWidth size="small">
          <Select
            label="Select a dataset"
            onChange={(event) => setDataset(event.target.value as string)}
            native
          >
            {Object.keys(datasetsList).map((key) => (
              <optgroup label={key} key={key}>
                {datasetsList[key].map((item) => (
                  <option
                    value={`${key}/${item.dataset}?version=${item.version}`}
                    key={item.dataset}
                  >
                    {item.dataset}
                  </option>
                ))}
              </optgroup>
            ))}
          </Select>
        </FormControl>
      </Row>
    </Card>
  )
}

export default UserModifyPage

UserModifyPage.getLayout = (page) => (
  <AccountLayout title="Download">{page}</AccountLayout>
)
