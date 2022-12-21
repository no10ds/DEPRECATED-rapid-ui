import { Button, PublicLayout } from '@/components'
import { Typography } from '@mui/material'
import getConfig from 'next/config'
import { useRouter } from 'next/navigation'
import env from '@beam-australia/react-env'
import { useEffect } from 'react'

const { publicRuntimeConfig } = getConfig()

const IndexPage = () => {
  const router = useRouter()

  useEffect(() => {
    console.log(env('API_URL'))
  }, [])

  return (
    <>
      <Button
        href={publicRuntimeConfig.loginUrl}
        color="primary"
        size="large"
        onClick={() => router.push('/account/')}
        fullWidth
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
    title="Welcome Back"
    promo={
      <>
        <Typography gutterBottom variant="body1">
          Project rAPId aims to create consistent, secure, interoperable data storage and
          sharing interfaces (APIs) that enable departments to discover, manage and share
          data and metadata amongst themselves.
        </Typography>

        <Typography gutterBottom variant="body1">
          This will improve the government's use of data by making it more scalable,
          secure, and resilient, helping to match the rising demand for good-quality
          evidence in the design, delivery, and evaluation of public policy.
        </Typography>

        <Typography gutterBottom variant="body1">
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
