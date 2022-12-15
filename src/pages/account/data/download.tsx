import { Card, Row, BadgeNumber, Chip, Button, TextField, Select } from '@/components'
import AccountLayout from '@/components/Layout/AccountLayout'
import { FormControl, Typography } from '@mui/material'

function UserModifyPage() {
  return (
    <Card action={<Button color="primary">Upload dataset</Button>}>
      <Typography variant="h2" gutterBottom>
        <BadgeNumber label="1" /> Select subject
      </Typography>

      <Row>
        <FormControl fullWidth size="small">
          <Select label="Select subject" data={[]}>
            <option value="" disabled>
              Please select a dataset
            </option>
            <optgroup label="automotive">
              <option data-versions="1" value="automotive/car_sales">
                car_sales
              </option>
            </optgroup>
            <optgroup label="claude_qa">
              <option data-versions="1" value="claude_qa/lydia_watching">
                lydia_watching
              </option>
              <option data-versions="1" value="claude_qa/lydia_watching2">
                lydia_watching2
              </option>
            </optgroup>
            <optgroup label="demo">
              <option data-versions="3" value="demo/gapminder">
                gapminder
              </option>
              <option data-versions="1" value="demo/gapminer">
                gapminer
              </option>
              <option data-versions="1" value="demo/gsmo">
                gsmo
              </option>
              <option data-versions="2" value="demo/test">
                test
              </option>
              <option data-versions="2" value="demo/upload">
                upload
              </option>
            </optgroup>
            <optgroup label="my_domain_name">
              <option data-versions="1" value="my_domain_name/my_dataset_name">
                my_dataset_name
              </option>
            </optgroup>
            <optgroup label="pentest_doamin">
              <option data-versions="1" value="pentest_doamin/pentest_dataset">
                pentest_dataset
              </option>
            </optgroup>
            <optgroup label="pentest_test">
              <option data-versions="1" value="pentest_test/pentest_dataset">
                pentest_dataset
              </option>
            </optgroup>
            <optgroup label="showcase">
              <option data-versions="3" value="showcase/movies">
                movies
              </option>
              <option data-versions="1" value="showcase/netflix">
                netflix
              </option>
            </optgroup>
            <optgroup label="test_e2e">
              <option data-versions="None" value="test_e2e/delete">
                delete
              </option>
              <option data-versions="1" value="test_e2e/query">
                query
              </option>
              <option data-versions="1" value="test_e2e/upload">
                upload
              </option>
            </optgroup>
            <optgroup label="test_e2e_protected">
              <option data-versions="1" value="test_e2e_protected/do_not_delete">
                do_not_delete
              </option>
            </optgroup>
            <optgroup label="ui_test">
              <option data-versions="1" value="ui_test/upload">
                upload
              </option>
              <option data-versions="1" value="ui_test/upload_private">
                upload_private
              </option>
            </optgroup>
          </Select>
        </FormControl>
      </Row>

      <Typography variant="h2" gutterBottom>
        <BadgeNumber label="2" /> Choose a file that corresponds to this dataset:
      </Typography>

      <input name="file" id="file" type="file" />
    </Card>
  )
}

export default UserModifyPage

UserModifyPage.getLayout = (page) => (
  <AccountLayout title="Download">{page}</AccountLayout>
)
