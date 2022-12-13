import { Button, PublicLayout } from '@/components'
import { Typography } from '@mui/material'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const IndexPage = () => {
  return (
    <>
      <Typography>Welcome back</Typography>
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
IndexPage.getLayout = (page) => <PublicLayout>{page}</PublicLayout>
