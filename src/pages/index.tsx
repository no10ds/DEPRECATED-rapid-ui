import { Button, PublicLayout } from '@/components'
import { Typography } from '@mui/material'
import { ConnectionRelation } from '@/components/Icon'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const IndexPage = () => {
  return (
    <>
      {/* <ConnectionRelation style={{ marginBottom: 10, fontSize: 190 }} /> */}

      <Typography gutterBottom>Welcome back</Typography>

      <Button
        href={publicRuntimeConfig.loginUrl}
        color="primary"
        size="large"
        disableRoute
      >
        Login
      </Button>
    </>
  )
}

export default IndexPage
IndexPage.getLayout = (page) => (
  <PublicLayout
    title="Sign in"
    promo={
      <>
        <Typography gutterBottom variant="body2">
          Project rAPId aims to create consistent, secure, interoperable data storage and
          sharing interfaces (APIs) that enable departments to discover, manage and share
          data and metadata amongst themselves.
        </Typography>

        <Typography gutterBottom variant="body2">
          This will improve the government's use of data by making it more scalable,
          secure, and resilient, helping to match the rising demand for good-quality
          evidence in the design, delivery, and evaluation of public policy.
        </Typography>

        <Typography gutterBottom variant="body2">
          The project aims to deliver a replicable template for simple data storage
          infrastructure in AWS, a RESTful API and custom frontend UI to ingest and share
          named, standardised datasets.
        </Typography>
      </>
    }
  >
    {page}
  </PublicLayout>
)
