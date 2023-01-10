import { z } from 'zod'

// export const ClientPermissionsEnum = z.enum([
//   'READ_ALL',
//   'READ_PUBLIC',
//   'READ_PRIVATE',
//   'READ_PROTECTED_{DOMAIN}',
//   'WRITE_ALL',
//   'WRITE_PUBLIC',
//   'WRITE_PRIVATE',
//   'WRITE_PROTECTED_{DOMAIN}',
//   'DATA_ADMIN',
//   'USER_ADMIN'
// ])

const SensitivityEnum = z.enum(['PUBLIC', 'PRIVATE', 'PROTECTED'])
const UserTypeEnum = z.enum(['User', 'Client'])

export const SubjectCreate = z.object({
  type: UserTypeEnum,
  email: z.string().email().optional(),
  name: z.string(),
  permissions: z.array(z.string()).optional()
})

const keyValueTag = z.object({
  key: z.string().min(1),
  value: z.string().min(1)
})

const keyTag = z.object({
  key: z.string().min(1)
})

export const schemaCreateSchema = z.object({
  sensitivity: SensitivityEnum,
  domain: z.string(),
  title: z.string(),
  keyValueTags: z.array(keyValueTag.required()),
  keyTags: z.array(keyTag)
})
