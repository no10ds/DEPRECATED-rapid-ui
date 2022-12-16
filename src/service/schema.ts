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

const UserTypeEnum = z.enum(['USER', 'CLIENT'])

export const SchemaUserCreate = z.object({
  type: UserTypeEnum,
  name: z.string(),
  email: z.string().email(),
  permissions: z.array(z.string()).optional()
})

const keyValueTags = z.object({
  key: z.string(),
  value: z.string()
})

export const schemaCreateSchema = z.object({
  keyValueTags: z.array(keyValueTags),
  keyTags: z.array(z.string())
})
