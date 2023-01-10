import { z } from 'zod'
import { schemaCreateSchema } from './schema'

export type ClientCreateBody = {
  client_name: string
  permissions: string[]
}

export type ClientCreateResponse = {
  client_id: string
  client_name: string
  client_secret: string
  permissions: string[]
}

export type UserCreateBody = {
  username: string
  email: string
  permissions: string[]
}

export type UserCreateResponse = {
  username: string
  user_id: string
  email: string
  permissions: string[]
}

export type SchemaCreate = z.infer<typeof schemaCreateSchema>
