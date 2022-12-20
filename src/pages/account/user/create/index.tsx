import { Card, Row, Chip, Button, TextField, Select, Alert } from '@/components'
import AccountLayout from '@/components/Layout/AccountLayout'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createClient, SchemaUserCreate } from '@/service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

const userType = ['User', 'Client']
const managementPermissions = ['Data', 'User']
const readPermissions = ['All', 'Public', 'Private', 'None']

type UserCreate = z.infer<typeof SchemaUserCreate>

function CreateUserPage() {
  const router = useRouter()

  const { control, handleSubmit } = useForm<UserCreate>({
    resolver: zodResolver(SchemaUserCreate)
  })

  const { isLoading, mutate, error } = useMutation<UserCreate, Error, UserCreate>({
    mutationFn: createClient,
    onSuccess: () => {
      router.push('/account/user/create/success/')
    }
  })

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await mutate(data)
      })}
      noValidate
    >
      <Card
        action={
          <Button color="primary" type="submit" loading={isLoading}>
            Create subject
          </Button>
        }
      >
        <Typography variant="body1" gutterBottom>
          Create a new user or client using the rAPId instance. Simply fill out the form
          with the required information, which can be found in more detail at the link{' '}
          <a href="https://github.com/no10ds/rapid-api/blob/main/docs/guides/usage/usage.md#create-user">
            provided.
          </a>
        </Typography>

        <Typography variant="h2" gutterBottom>
          Populate User Info
        </Typography>

        <Row>
          <Controller
            name="type"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <Typography variant="caption" gutterBottom>
                  Type of Subject
                </Typography>
                <Select
                  {...field}
                  data={userType}
                  error={!!error}
                  helperText={error?.message}
                />
              </>
            )}
          />
        </Row>

        <Row>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <Typography variant="caption" gutterBottom>
                  Email
                </Typography>
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  type="email"
                  error={!!error}
                  helperText={error?.message}
                />
              </>
            )}
          />
        </Row>
        <Row>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <Typography variant="caption" gutterBottom>
                  Name
                </Typography>
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
          Select Permissions
        </Typography>

        <Row>
          <Typography variant="caption" component="label" gutterBottom>
            Management Permissions
          </Typography>

          <Stack direction="row" spacing={2}>
            {managementPermissions.map((type) => {
              return <Chip label={type} key={type} toggle />
            })}
          </Stack>
        </Row>

        <Row>
          <Typography variant="caption" component="label" gutterBottom>
            Global Read Permissions
          </Typography>
          <Stack direction="row" spacing={2}>
            {readPermissions.map((type) => {
              return <Chip label={type} key={type} toggle />
            })}
          </Stack>
        </Row>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error?.message}
          </Alert>
        )}
      </Card>
    </form>
  )
}

export default CreateUserPage

CreateUserPage.getLayout = (page) => (
  <AccountLayout title="Create User">{page}</AccountLayout>
)
