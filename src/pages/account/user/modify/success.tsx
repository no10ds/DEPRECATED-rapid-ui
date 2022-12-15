import { Card, Row, BadgeNumber, Button, Select, Alert } from '@/components'
import AccountLayout from '@/components/Layout/AccountLayout'

function SuccessPage() {
  return (
    <Card>
      <Alert title="Permissions modified for demo_read_public">
        Data admin Read public Write all Read protected claude qa
      </Alert>
    </Card>
  )
}

export default SuccessPage

SuccessPage.getLayout = (page) => <AccountLayout title="Success">{page}</AccountLayout>
