import { z } from 'zod'
import { schemaCreateSchema } from './schema'

export type DataFormats = 'csv' | 'json'

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

export type FilteredSubjectList = {
  ClientApps: {
    subjectId: string
    subjectName: string
  }[]
  Users: {
    subjectId: string
    subjectName
  }[]
}

export type UpdateSubjectPermissionsResponse = {
  subject_id: string
  permissions: string[]
}

export type UpdateSubjectPermissionsBody = {
  subject_id: string
  permissions: string[]
}

export type UploadDatasetResponseDetails = {
  dataset_version: number
  job_id: string
  original_filename: string
  raw_filename: string
  status: string
}

export type UploadDatasetResponse = {
  details: UploadDatasetResponseDetails
}

export type DatasetInfoResponse = {
  metadata: {
    domain: string
    dataset: string
    sensitivity: string
    version?: number
    key_value_tags: { [key: string]: string }
    key_only_tags: string[]
    owners?: { name: string; email: string }[]
    update_behaviour: 'APPEND'
    number_of_columns: number
    number_of_rows: number
    last_updated: string
  }
  columns: {
    name: string
    partition_index?: number
    data_type: string
    allow_null: boolean
    format?: string
    statistics?: { [key: string]: string }
  }[]
}
