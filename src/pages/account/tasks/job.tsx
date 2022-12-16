import { Card, SimpleTable, AccountLayout } from '@/components'
import { CrossCircle } from '@/components/Icon'
import { asVerticalTableList } from '@/lib'
import { TableCellProps, Typography } from '@mui/material'
import { useRouter } from 'next/router'

function JobDetailPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <Card>
      <CrossCircle />
      <Typography variant="h2" gutterBottom>
        FAILED
      </Typography>

      <Typography variant="h2" gutterBottom>
        {id}
      </Typography>

      <SimpleTable
        list={asVerticalTableList([
          { name: 'Job Type', value: 'UPLOAD' },
          { name: 'Status', value: 'FAILED' },
          { name: 'Step', value: 'Validation' },
          { name: 'Filename', value: 'skills.csv' },
          { name: 'Raw Filename	', value: '56bdf82d-1da9-410a-818e-f78414024807.csv' },
          { name: 'Domain	', value: 'automotive' },
          { name: 'Dataset	', value: 'car_sales' },
          { name: 'Version	', value: '1' }
        ])}
      />

      <Typography variant="h2" gutterBottom>
        Errors
      </Typography>

      <Typography variant="body2" color="error" component="code">
        Expected columns: ['brand', 'name', 'bodytype', 'color', 'fueltype', 'year',
        'mileage', 'transmission', 'power', 'price', 'vehicle_configuration',
        'engine_name', 'engine_displacement', 'date', 'location', 'link', 'parse_date'],
        received: ['name', 'total_users', 'number_with_skill', 'percentage_with_skill',
        'number_to_develop_skill', 'percentage_to_develop_skill', 'number_beginners',
        'percentage_beginners', 'number_advanced_beginners',
        'percentage_advanced_beginners', 'number_competent', 'percentage_competent',
        'number_proficient', 'percentage_proficient', 'number_expert',
        'percentage_expert']
      </Typography>
    </Card>
  )
}

export default JobDetailPage

JobDetailPage.getLayout = (page) => (
  <AccountLayout title="Job Detail">{page}</AccountLayout>
)
