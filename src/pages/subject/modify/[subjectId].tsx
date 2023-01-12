import { Button, Card, Chip, Row } from '@/components'
import AccountLayout from '@/components/Layout/AccountLayout'
import {
  getPermissionsListUi,
  getSubjectPermissions,
  updateSubjectPermissions
} from '@/service'
import {
  UpdateSubjectPermissionsBody,
  UpdateSubjectPermissionsResponse
} from '@/service/types'
import { Alert, Stack, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const permissionListKeyMapping = {
  ADMIN: 'Management Permissions',
  GLOBAL_READ: 'Global Read Permissions',
  GLOBAL_WRITE: 'Global Write Permissions',
  PROTECTED_READ: 'Read Protected Permissions',
  PROTECTED_WRITE: 'Write Protected Permissions'
}

function SubjectModifyPage() {
  const router = useRouter()
  const { subjectId, name } = router.query

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const { isLoading: isPermissionsListLoading, data: permissionsListData } = useQuery(
    ['permissionsList'],
    getPermissionsListUi
  )

  const { isLoading: isSubjectPermissionsLoading, data: subjectPermissionsData } =
    useQuery(['subjectPermissions', subjectId], getSubjectPermissions)

  useEffect(() => {
    if (subjectPermissionsData) {
      setSelectedPermissions(subjectPermissionsData)
    }
  }, [subjectPermissionsData])

  const { isLoading, mutate, error } = useMutation<
    UpdateSubjectPermissionsResponse,
    Error,
    UpdateSubjectPermissionsBody
  >({
    mutationFn: updateSubjectPermissions,
    onSuccess: () => {
      router.push({ pathname: `/subject/modify/success/${subjectId}`, query: { name } })
    }
  })

  if (isPermissionsListLoading || isSubjectPermissionsLoading) {
    return <p>Loading....</p>
  }

  return (
    <Card
      action={
        <Button
          color="primary"
          loading={isLoading}
          onClick={() => {
            mutate({ subject_id: subjectId as string, permissions: selectedPermissions })
          }}
        >
          Modify
        </Button>
      }
    >
      <Typography variant="h2" gutterBottom>
        Modify Subject
      </Typography>
      <Typography gutterBottom>Select permissions for {name}</Typography>

      {Object.keys(permissionsListData).map((key, index) => {
        return (
          <Row key={index}>
            <Typography variant="caption" component="label" gutterBottom>
              {permissionListKeyMapping[key]}
            </Typography>
            <Stack direction="row" spacing={2}>
              {permissionsListData[key].map((item) => {
                return (
                  <Chip
                    active={selectedPermissions.includes(item.name)}
                    label={item.display_name}
                    key={item.display_name_full}
                    onToggle={(e, active) => {
                      if (active) {
                        setSelectedPermissions([...selectedPermissions, item.name])
                      } else {
                        setSelectedPermissions(
                          selectedPermissions.filter((_item) => _item !== item.name)
                        )
                      }
                    }}
                    toggle
                  />
                )
              })}
            </Stack>
          </Row>
        )
      })}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error?.message}
        </Alert>
      )}
    </Card>
  )
}

export default SubjectModifyPage

SubjectModifyPage.getLayout = (page) => (
  <AccountLayout title="Modify User">{page}</AccountLayout>
)