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
import { z } from 'zod'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const dataTypes = ['Int64', 'Float64', 'object', 'date', 'boolean']

const keyValueTags = z.object({
  key: z.string(),
  value: z.string()
})

const schema = z.object({
  keyValueTags: z.array(keyValueTags),
  keyTags: z.array(z.string())
})

function UserModifyPage() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema)
  })

  const fieldKeyValueTags = useFieldArray({
    control,
    name: 'keyValueTags'
  })

  const fieldKeyTags = useFieldArray({
    control,
    name: 'keyTags'
  })

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
          <BadgeNumber label="1" /> Populate dataset properties for the new schema:
        </Typography>

        <Typography gutterBottom>
          Consult the
          <Link
            href="https://github.com/no10ds/rapid-api/blob/main/docs/guides/usage/schema_creation.md"
            target="_blank"
          >
            schema writing guide
          </Link>{' '}
          for further information.
        </Typography>

        <Row>
          <FormControl fullWidth size="small">
            <Select label="sensitivity level" data={['PUBLIC', 'PRIVATE', 'PROTECTED']} />
          </FormControl>
        </Row>

        <Row>
          <TextField fullWidth size="small" label="Dataset domain" variant="outlined" />
        </Row>

        <Row>
          <TextField fullWidth size="small" label="Dataset title" variant="outlined" />
        </Row>

        <Typography variant="h2" gutterBottom>
          <BadgeNumber label="2" /> Upload the data to generate the schema for
        </Typography>

        <Row>
          <input name="file" id="file" type="file" />
        </Row>

        <Typography variant="h2" gutterBottom>
          <BadgeNumber label="3" /> Validate the data types for the schema
        </Typography>

        <Typography variant="body2" gutterBottom>
          Consult the schema writing guide for further information.
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
                children: (
                  <TextField size="small" label="Dataset domain" variant="outlined" />
                )
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
                children: (
                  <TextField size="small" label="Dataset domain" variant="outlined" />
                )
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
          <BadgeNumber label="4" /> Set the data owner
        </Typography>

        <Row>
          <TextField
            fullWidth
            size="small"
            label="Owner email"
            type="email"
            variant="outlined"
          />
        </Row>

        <Row>
          <TextField fullWidth size="small" label="Owner name" variant="outlined" />
        </Row>

        <Typography variant="h2" gutterBottom>
          <BadgeNumber label="5" /> Set the file upload behaviour
        </Typography>

        <Row>
          <FormControl fullWidth size="small">
            <Select label="Update behaviour" data={['APPEND', 'OVERWRITE']} />
          </FormControl>
        </Row>

        <Typography variant="h2" gutterBottom>
          <BadgeNumber label="6" /> Optionally set key value tags
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
            color="primary"
            onClick={() => {
              fieldKeyValueTags.append({ key: '', value: '' })
            }}
          >
            Add
          </Button>
        </Row>

        <Typography variant="h2" gutterBottom>
          <BadgeNumber label="7" /> Optionally set key only tags
        </Typography>

        {fieldKeyTags.fields.map((_item, index) => (
          <Controller
            key={index}
            name={`keyTags.${index}`}
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
          <Button color="primary" onClick={() => fieldKeyTags.append('')}>
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
