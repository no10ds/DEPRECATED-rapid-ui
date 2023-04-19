import { z } from 'zod'

export const SensitivityEnum = z.enum(['PUBLIC', 'PRIVATE', 'PROTECTED'])
const UserTypeEnum = z.enum(['User', 'Client'])

export const DataActionValues = ['READ', 'WRITE']
export const AdminActionValues = ['DATA_ADMIN', 'USER_ADMIN']

const DataActionEnum = z.enum(DataActionValues)
const AdminActionEnum = z.enum(AdminActionValues)


const DataPermission = z.object({
  type: DataActionEnum,
  layer: z.string(),
  sensitivity: z.string(),
  domain: z.string().optional(),
})

const AdminPermission = z.object({
  type: AdminActionEnum,
})

export const Permission = z.discriminatedUnion("type", [DataPermission, AdminPermission], {
  errorMap: () => {
    return { message: 'Required' };
  }
})

export const SubjectCreate = z.object({
  type: UserTypeEnum,
  email: z.string().email().optional(),
  name: z.string(),
  permissions: z.array(Permission)
})

export const schemaCreateSchema = z.object({
  sensitivity: SensitivityEnum,
  domain: z.string(),
  title: z.string(),
  description: z.string().optional(),
  ownerEmail: z
    .string()
    .email()
    .refine((arg) => !(arg === 'change_me@email.com'), { message: 'Change Required' }),
  ownerName: z
    .string()
    .refine((arg) => !(arg === 'change_me'), { message: 'Change Required' })
})

export const schemaGenerateSchema = z.object({
  sensitivity: SensitivityEnum,
  layer: z.string(),
  domain: z.string(),
  title: z.string()
})
