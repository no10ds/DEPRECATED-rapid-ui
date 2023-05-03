import { Card, Row, Button, Alert, Link } from '@/components'
import ErrorCard from '@/components/ErrorCard/ErrorCard'
import AccountLayout from '@/components/Layout/AccountLayout'
import DatasetSelector from '@/components/DatasetSelector/DatasetSelector'
import { getDatasetsUi, uploadDataset } from '@/service'
import { Dataset, UploadDatasetResponse, UploadDatasetResponseDetails } from '@/service/types'
import { Typography, LinearProgress } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'


function UploadDataset({ datasetInput = null }: { datasetInput?: Dataset }) {
  const [file, setFile] = useState<File | undefined>()
  const [dataset, setDataset] = useState<Dataset>(datasetInput)
  const [uploadSuccessDetails, setUploadSuccessDetails] = useState<
    UploadDatasetResponseDetails | undefined
  >()

  const {
    isLoading: isDatasetsListLoading,
    data: datasetsList,
    error: datasetsError
  } = useQuery(['datasetsList', 'WRITE'], getDatasetsUi)

  const { isLoading, mutate, error } = useMutation<
    UploadDatasetResponse,
    Error,
    { path: string; data: FormData }
  >({
    mutationFn: uploadDataset,
    onMutate: () => {
      setUploadSuccessDetails(undefined)
    },
    onSuccess: (data) => {
      setUploadSuccessDetails(data.details)
    }
  })

  if (isDatasetsListLoading) {
    return <LinearProgress />
  }

  if (datasetsError) {
    return <ErrorCard error={datasetsError as Error} />
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('file', file)
        await mutate({ path: `${dataset.layer}/${dataset.domain}/${dataset.dataset}?version=${dataset.version}`, data: formData })
      }}
    >
      <Card
        action={
          <Button color="primary" type="submit" loading={isLoading} data-testid="submit">
            Upload dataset
          </Button>
        }
      >
        <Typography variant="body1" gutterBottom>
          Upload a new file to the selected data source. It assumes a given a schema has
          been uploaded for the data source and the data to upload matches this schema.
        </Typography>

        <DatasetSelector datasetsList={datasetsList} setParentDataset={setDataset}></DatasetSelector>

        <Row>
          <input
            name="file"
            id="file"
            type="file"
            data-testid="upload"
            onChange={(event) => setFile(event.target.files[0])}
          />
        </Row>

        {uploadSuccessDetails ? (
          <Alert
            title={`File accepted: ${uploadSuccessDetails.original_filename}`}
            data-testid="upload-status"
            severity="info"
          >
            <Typography variant="body2">
              Raw file name: {uploadSuccessDetails.raw_filename}
            </Typography>
            <Typography variant="body2">Status: {uploadSuccessDetails.status}</Typography>
            <Typography variant="body2">
              Version: {uploadSuccessDetails.dataset_version}
            </Typography>

            <Link href={`/tasks/${uploadSuccessDetails.job_id}`}>
              Track upload progress
            </Link>
          </Alert>
        ) : null}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error?.message}
          </Alert>
        )}
      </Card>
    </form>
  )
}

export default UploadDataset

UploadDataset.getLayout = (page) => <AccountLayout title="Upload">{page}</AccountLayout>
