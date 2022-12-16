import { z } from 'zod'
import { schemaCreateSchema, SchemaUserCreate } from './schema'

export type ClientResponse = {
  client_id: string
  client_name: string
  client_secret: string
  permissions: string[]
}

export type ClientCreate = z.infer<typeof SchemaUserCreate>

export type SchemaCreate = z.infer<typeof schemaCreateSchema>
