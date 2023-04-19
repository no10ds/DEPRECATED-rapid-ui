import { z } from 'zod'

import { PermissionUiResponse } from './types'
import { DataActionValues, AdminActionValues, Permission } from '@/service'

type PermissionType = z.infer<typeof Permission>

export const fetchPermissionName = (permission: PermissionType, permissionsListData: PermissionUiResponse[]) => {
    // Idetify which is permisison in the data corresponds with the given one and extract the name
    const dataPermission = permissionsListData.filter(
        row => {
            if (AdminActionValues.includes(permission.type)) {
                return row.type === permission.type
            }
            // TODO: Ideally the line immediately below would work but it gives a typescript error
            // else if (DataActionValues.includes(permission.type)) {
            else if (permission.type === "READ" || permission.type === "WRITE") {
                return (
                    row.type === permission.type &&
                    row.layer === permission.layer &&
                    row.domain === permission.domain &&
                    row.sensitivity === permission.sensitivity
                )
            }
        }
    )

    if (dataPermission.length != 0) {
        return dataPermission[0].name
    }
}



