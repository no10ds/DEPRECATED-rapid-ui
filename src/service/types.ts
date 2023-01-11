import { StringLiteralLike } from 'typescript'
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
