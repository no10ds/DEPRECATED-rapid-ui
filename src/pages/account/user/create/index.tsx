import {
  Card,
  Row,
  BadgeNumber,
  Chip,
  Button,
  TextField,
  Select,
  Alert
} from '@/components'
import AccountLayout from '@/components/Layout/AccountLayout'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createClient, SchemaUserCreate } from '@/service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

const userType = ['USER', 'CLIENT']
const managementPermissions = ['Data', 'User']
const readPermissions = ['All', 'Public', 'Private', 'None']

type UserCreate = z.infer<typeof SchemaUserCreate>

function CreateUserPage() {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UserCreate>({
    resolver: zodResolver(SchemaUserCreate)
  })

  console.log({ errors })

  const { isLoading, mutate, error } = useMutation<UserCreate, Error, UserCreate>({
    mutationFn: createClient,
    onSuccess: async (data) => {
      router.push('/account/user/create/success/')
    },
    onError: ({ message }) => {
      console.log({ message })
    }
  })

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        console.log('handleSubmit', { data })
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
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error?.message}
          </Alert>
        )}

        <Typography variant="h2" gutterBottom>
          <BadgeNumber label="1" /> Populate user info
        </Typography>

        <Row>
          <Controller
            name="type"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Select
                {...field}
                label="Type of User"
                data={userType}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Row>

        <Row>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Email"
                type="email"
                variant="outlined"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Row>
        <Row>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Name"
                variant="outlined"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Row>

        <Typography variant="h2" gutterBottom>
          <BadgeNumber label="2" /> Select Permissions
        </Typography>

        <Row>
          <Typography variant="body2" component="label" gutterBottom>
            Management Permissions
          </Typography>

          <Stack direction="row" spacing={1}>
            {managementPermissions.map((type) => {
              return <Chip label={type} key={type} toggle />
            })}
          </Stack>
        </Row>

        <Row>
          <Typography variant="body2" component="label" gutterBottom>
            Global Read Permissions
          </Typography>
          <Stack direction="row" spacing={1}>
            {readPermissions.map((type) => {
              return <Chip label={type} key={type} toggle />
            })}
          </Stack>
        </Row>
      </Card>
    </form>
  )
}

export default CreateUserPage

CreateUserPage.getLayout = (page) => (
  <AccountLayout title="Create User">{page}</AccountLayout>
)
