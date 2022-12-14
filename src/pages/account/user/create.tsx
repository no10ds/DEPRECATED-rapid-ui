import { Card } from '@/components'
import AccountLayout from '@/components/Layout/AccountLayout'
import { Typography } from '@mui/material'

function CreateUserPage() {
  return <Card>blah</Card>
}

export default CreateUserPage

CreateUserPage.getLayout = (page) => (
  <AccountLayout title="Dashbaord">{page}</AccountLayout>
)
