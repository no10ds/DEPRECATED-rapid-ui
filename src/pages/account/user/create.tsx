import AccountLayout from '@/components/Layout/AccountLayout'
import { Typography } from '@mui/material'

function CreateUserPage() {
  return <div></div>
}

export default CreateUserPage

CreateUserPage.getLayout = (page) => (
  <AccountLayout title="Dashbaord">{page}</AccountLayout>
)
