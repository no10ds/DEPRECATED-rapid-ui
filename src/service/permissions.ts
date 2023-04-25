import { z } from 'zod'

import { PermissionUiResponse } from './types'
import { DataActionValues, AdminActionValues, Permission, AdminPermission, DataPermission } from '@/service'

type PermissionType = z.infer<typeof Permission>

export const fetchPermissionName = (permission: PermissionType, permissionsListData: PermissionUiResponse[]) => {
    // Idetify which is permisison in the data corresponds with the given one and extract the name
    const dataPermission = permissionsListData.filter(
        row => {
            if ((AdminActionValues as ReadonlyArray<string>).includes(permission.type)) {
                return row.type === (permission as z.infer<typeof AdminPermission>).type
            }
            else if ((DataActionValues as ReadonlyArray<string>).includes(permission.type)) {
                // Convert to expected type to prevent typescript errors coming from the discriminated union
                const typeSafePermission = (permission as z.infer<typeof DataPermission>)
                return (
                    row.type === typeSafePermission.type &&
                    row.layer === typeSafePermission.layer &&
                    row.domain === typeSafePermission.domain &&
                    row.sensitivity === typeSafePermission.sensitivity
                )
            }
        }
    )

    if (dataPermission.length != 0) {
        return dataPermission[0].name
    }
}



