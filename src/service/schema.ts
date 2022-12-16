import { z } from 'zod'

const UserTypeEnum = z.enum(['USER', 'CLIENT'])

export const SchemaUserCreate = z.object({
  type: UserTypeEnum,
  name: z.string(),
  email: z.string().email(),
  permissions: z.array(z.string())
})
