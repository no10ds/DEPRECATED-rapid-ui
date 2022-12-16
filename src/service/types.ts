import { z } from 'zod'
import { SchemaUserCreate } from './schema'

export type ClientResponse = {
  client_id: string
  client_name: string
  client_secret: string
  permissions: string[]
}

export type ClientCreate = z.infer<typeof SchemaUserCreate>
