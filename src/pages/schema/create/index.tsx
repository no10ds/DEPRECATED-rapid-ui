import {
  Card,
  Row,
  BadgeNumber,
  Button,
  TextField,
  Select,
  SimpleTable
} from '@/components'
import AccountLayout from '@/components/Layout/AccountLayout'
import { FormControl, Link, Typography, Box } from '@mui/material'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schemaCreateSchema } from '@/service'
import { SchemaCreate } from '@/service/types'

const dataTypes = ['Int64', 'Float64', 'object', 'date', 'boolean']

function UserModifyPage() {
  const { control, handleSubmit } = useForm<SchemaCreate>({
    resolver: zodResolver(schemaCreateSchema)
  })

  const fieldKeyValueTags = useFieldArray({ control, name: 'keyValueTags' })
  const fieldKeyTags = useFieldArray({ control, name: 'keyTags' })

  return (
    // eslint-disable-next-line no-console
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <Card
        action={
          <Button color="primary" type="submit">
            Generate Schema
          </Button>
        }
      >
        <Typography variant="h2" gutterBottom>
          Populate dataset properties for the new schema:
        </Typography>

        <Typography gutterBottom>
          Consult the{' '}
          <Link
            href="https://github.com/no10ds/rapid-api/blob/main/docs/guides/usage/schema_creation.md"
            target="_blank"
          >
            schema writing guide
          </Link>{' '}
          for further information.
        </Typography>

        <Row>
          <Controller
            name="sensitivity"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <Typography variant="caption">Sensitivity Level</Typography>
                <Select
                  {...field}
                  data={['PUBLIC', 'PRIVATE', 'PROTECTED']}
                  error={!!error}
                  helperText={error?.message}
                />
              </>
            )}
          />
        </Row>

        <Row>
          <Controller
            name="domain"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <Typography variant="caption">Dataset Domain</Typography>
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  variant="outlined"
                  error={!!error}
                  helperText={error?.message}
                />{' '}
              </>
            )}
          />
        </Row>

        <Row>
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <Typography variant="caption">Dataset Title</Typography>
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  variant="outlined"
                  error={!!error}
                  helperText={error?.message}
                />
              </>
            )}
          />
        </Row>

        <Typography variant="h2" gutterBottom>
          Upload the data to generate the schema for
        </Typography>

        <Row>
          <input name="file" id="file" type="file" />
        </Row>

        <Typography variant="h2" gutterBottom>
          Validate the data types for the schema
        </Typography>

        <SimpleTable
          sx={{ mb: 4 }}
          list={[
            [
              { children: 'name' },
              {
                children: (
                  <FormControl fullWidth size="small">
                    <Select label="Data type" data={dataTypes} />
                  </FormControl>
                )
              },
              {
                children: (
                  <FormControl fullWidth size="small">
                    <Select label="Allows Null" data={['true', 'false']} />
                  </FormControl>
                )
              },
              {
                children: <TextField size="small" variant="outlined" />
              }
            ],
            [
              { children: 'total_users' },
              {
                children: (
                  <FormControl fullWidth size="small">
                    <Select label="Data type" data={dataTypes} />
                  </FormControl>
                )
              },
              {
                children: (
                  <FormControl fullWidth size="small">
                    <Select label="Allows Null" data={['true', 'false']} />
                  </FormControl>
                )
              },
              {
                children: <TextField size="small" variant="outlined" />
              }
            ]
          ]}
          headers={[
            { children: 'Name' },
            { children: 'Data Type' },
            { children: 'Allows Null' },
            { children: 'Partition Index (Optional)' }
          ]}
        />

        <Typography variant="h2" gutterBottom>
          Set the data owner
        </Typography>

        <Row>
          <Typography variant="caption">Owner Email</Typography>
          <TextField fullWidth size="small" type="email" variant="outlined" />
        </Row>

        <Row>
          <Typography variant="caption">Owner Name</Typography>
          <TextField fullWidth size="small" variant="outlined" />
        </Row>

        <Typography variant="h2" gutterBottom>
          Set the file upload behaviour
        </Typography>

        <Row>
          <FormControl fullWidth size="small">
            <Typography variant="caption">Update Behaviour</Typography>
            <Select data={['APPEND', 'OVERWRITE']} />
          </FormControl>
        </Row>

        <Typography variant="h2" gutterBottom>
          Optionally set key value tags
        </Typography>

        {fieldKeyValueTags.fields.map((_item, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 3, mb: 1 }}>
            <Controller
              name={`keyValueTags.${index}.key`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  label="Key"
                  variant="outlined"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name={`keyValueTags.${index}.value`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  label="Key"
                  variant="outlined"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />{' '}
          </Box>
        ))}

        <Row>
          <Button
            color="secondary"
            onClick={() => {
              fieldKeyValueTags.append({ key: '', value: '' })
            }}
          >
            Add
          </Button>
        </Row>

        <Typography variant="h2" gutterBottom>
          Optionally set key only tags
        </Typography>

        {fieldKeyTags.fields.map((_item, index) => (
          <Controller
            key={index}
            name={`keyTags.${index}.key`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                type="text"
                size="small"
                label="Key"
                variant="outlined"
                error={!!error}
                helperText={error?.message}
                sx={{ mb: 1 }}
              />
            )}
          />
        ))}

        <Row>
          <Button color="secondary" onClick={() => fieldKeyTags.append({ key: '' })}>
            Add
          </Button>
        </Row>
      </Card>
    </form>
  )
}

export default UserModifyPage

UserModifyPage.getLayout = (page) => (
  <AccountLayout
    title="Generate Schema
"
  >
    {page}
  </AccountLayout>
)
