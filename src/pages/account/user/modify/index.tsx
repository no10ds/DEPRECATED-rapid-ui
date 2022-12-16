import { Card, Row, BadgeNumber, Button, Select } from '@/components'
import AccountLayout from '@/components/Layout/AccountLayout'
import { FormControl, Typography } from '@mui/material'

function UserModifyPage() {
  return (
    <Card
      action={
        <Button color="primary" href="/account/user/modify/2/">
          Next
        </Button>
      }
    >
      <Typography variant="h2" gutterBottom>
        <BadgeNumber label="1" /> Select subject
      </Typography>

      <Row>
        <FormControl fullWidth size="small">
          <Select label="Select a Client App or User" data={[]} native>
            <optgroup label="Client Apps">
              <option value="42vu4lvllk5gmpredi08sdtsev">demo</option>
              <option value="1ahss7eserpim48ijoqinll1s2">demo_read_public</option>
              <option value="4mpm2vqeb1s2t7o8cjpqp32bdg">dfe_write_attendance</option>
              <option value="2984vc7apof637nfhddfe5jt8v">e2e_test_client</option>
              <option value="5a948t4dfb0032ll8e51k143aa">
                e2e_test_client_data_admin
              </option>
              <option value="18qov9cgkrtfrg4urrc601fa0o">
                e2e_test_client_read_and_write
              </option>
              <option value="65jv4lqiukfuihd8lr0rmrj98b">
                e2e_test_client_user_admin
              </option>
              <option value="7fsdfeo983s0srla5qc7gpmge7">lewis</option>
              <option value="31hfni8vumqrjcqoitto9f2ick">master</option>
              <option value="31jf4fppegdhhi7h02tf9f955v">rapid_test_client</option>
              <option value="1jos5au0eh1kqlskvqbro5jo6i">rapid_user_login</option>
              <option value="3bhf7cc473ji8jbhds20fvimn">read_demo</option>
              <option value="32alr14hdevbfo5d7bbr3g8ovb">read_demo_client</option>
              <option value="6hfmjtivoqvt33ua77ol4n9gh4">write_public_demo</option>
            </optgroup>

            <optgroup label="Users">
              <option value="b1a7c0eb-6cf6-471d-af44-447be19fca95">Test_user_20</option>
              <option value="c76d0250-cb90-47b6-9185-99a47f322d0b">cristhian</option>
              <option value="60b0d79e-10a9-4256-b375-5bc884ee74b3">lcard</option>
              <option value="1730506d-f3b7-487f-b36b-7f7056488a3d">oiqbal</option>
              <option value="46b867c0-09b2-4895-affd-0f46bfaf8434">pdunnett</option>
              <option value="ca2e0ede-f667-40de-aa05-e665b98c4b36">pentest-low</option>
              <option value="ceab8306-2a67-4ce1-84c8-ae731ba766a8">tdrane</option>
              <option value="fa644db4-2ef8-4481-b798-90f5dfc46332">ui-test-user</option>
            </optgroup>
          </Select>
        </FormControl>
      </Row>
    </Card>
  )
}

export default UserModifyPage

UserModifyPage.getLayout = (page) => (
  <AccountLayout title="Modify User: Step 2">{page}</AccountLayout>
)
