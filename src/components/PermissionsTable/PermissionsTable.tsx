import { Select } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { Typography } from '@mui/material'
import { Controller, useForm, FieldValues } from 'react-hook-form'
import { z } from 'zod'
import { Permission } from '@/service'
import { PermissionUiResponse } from '@/service/types'

const dataActions = ['READ', 'WRITE']

type PermissionType = z.infer<typeof Permission>


import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function PermissionsTable({ permissionsListData, fieldArrayReturn }: { permissionsListData: PermissionUiResponse[], fieldArrayReturn: FieldValues }) {

  const { fields, append, remove } = fieldArrayReturn

  const { control: controlPermission, trigger: triggerPermission, watch: watchPermission, reset: resetPermission } = useForm<PermissionType>({
    resolver: zodResolver(Permission)
  })

  const generateUniquePermissionOptions = (attribute) => [...new Set(permissionsListData.map((permisison) => permisison[attribute]))].map((item) => (
    item ? <option key={item}>{item}</option> : null
  ))

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Layer</TableCell>
            <TableCell>Sensitivity</TableCell>
            <TableCell>Domain</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(fields || []).map((item, index) =>
          (<TableRow
            key={item.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell
            >
              <IconButton
                color="primary"
                onClick={() => remove(index)}
              >
                <RemoveIcon />
              </IconButton>
            </TableCell>
            <TableCell>
              <Typography key={`permissions.${index}.type`}>{item.type}</Typography>
            </TableCell>
            <TableCell>
              <Typography key={`permissions.${index}.layer`}>{item.layer}</Typography>
            </TableCell>
            <TableCell>
              <Typography key={`permissions.${index}.sensitivity`}>{item.sensitivity}</Typography>
            </TableCell>
            <TableCell>
              <Typography key={`permissions.${index}.domain`}>{item.domain}</Typography>
            </TableCell>
          </TableRow>)
          )}
          <TableRow>
            <TableCell>
              <IconButton
                color="primary"
                onClick={async () => {
                  const result = await triggerPermission(undefined, { shouldFocus: true });
                  if (result) {
                    const permissionToAdd = watchPermission()
                    append(permissionToAdd)
                    resetPermission({
                      type: undefined,
                      layer: undefined,
                      sensitivity: undefined,
                      domain: undefined,
                    })
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            </TableCell>
            <TableCell>
              <Controller
                name={'type'}
                control={controlPermission}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    {...field}
                    error={!!error}
                    value={field.value ? field.value : ''}
                    helperText={error?.message}
                    native
                    inputProps={{
                      'data-testid': `field-type`
                    }}
                  >
                    <option value={''}>Action</option>
                    {generateUniquePermissionOptions('type')}
                  </Select>
                )}
              />
            </TableCell>
            <TableCell>
              <Controller
                name={'layer'}
                control={controlPermission}
                render={({ field, fieldState: { error } }) => (
                  dataActions.includes(watchPermission(`type`)) &&
                  <Select
                    {...field}
                    error={!!error}
                    value={field.value ? field.value : ''}
                    helperText={error?.message}
                    native
                    inputProps={{
                      'data-testid': `layer`
                    }}
                  >
                    <option value={''}>Layer</option>
                    {generateUniquePermissionOptions('layer')}
                  </Select>
                )}
              />
            </TableCell>
            <TableCell>
              <Controller
                name={'sensitivity'}
                control={controlPermission}
                render={({ field, fieldState: { error } }) => (
                  dataActions.includes(watchPermission(`type`)) &&
                  <Select
                    {...field}
                    value={field.value ? field.value : ''}
                    error={!!error}
                    helperText={error?.message}
                    native
                    inputProps={{
                      'data-testid': 'sensitivity'
                    }}
                  >
                    <option value={''}>Sensitivity</option>
                    {generateUniquePermissionOptions('sensitivity')}
                  </Select>
                )
                }
              />
            </TableCell>
            <TableCell>
              <Controller
                name={'domain'}
                control={controlPermission}
                render={({ field, fieldState: { error } }) => (
                  watchPermission('sensitivity') === 'PROTECTED' &&
                  <Select
                    {...field}
                    value={field.value ? field.value : ''}
                    error={!!error}
                    helperText={error?.message}
                    native
                    inputProps={{
                      'data-testid': 'domain'
                    }}
                  >
                    <option value={''}>Domain</option>
                    {generateUniquePermissionOptions('domain')}
                  </Select>)
                }
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PermissionsTable
