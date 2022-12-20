import { Card } from '@/components'
import AccountLayout from '@/components/Layout/AccountLayout'
import { Typography } from '@mui/material'

function SuccessPage() {
  return (
    <Card>
      <Typography variant="h1" gutterBottom>
        Success - Created
      </Typography>
      <Typography gutterBottom>
        You will only see this page once. Please make note of the details below.
      </Typography>
      <Typography variant="body2">
        <b>Secret:</b> sadadsds{' '}
      </Typography>
      <Typography variant="body2">
        <b>Id:</b> 2rfbsjl188cm6gvdpppou83g7f{' '}
      </Typography>
      <Typography variant="body2">
        <b>Secret:</b> mulagv9q65j1nd5ttdacs54abeb60piac5ktckn6phords9prv7{' '}
      </Typography>
    </Card>
  )
}

export default SuccessPage

SuccessPage.getLayout = (page) => (
  <AccountLayout title="Create User">{page}</AccountLayout>
)
