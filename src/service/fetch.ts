import {
  ClientCreateBody,
  DataFormats,
  DatasetInfoResponse,
  AllJobsResponse,
  UpdateSubjectPermissionsBody,
  UpdateSubjectPermissionsResponse,
  UserCreateBody,
  JobResponse,
  GenerateSchemaResponse,
  CreateSchemaResponse,
  MetadataSearchResponse
} from './types'
import { api } from '@/lib/data-utils'

export const getAuth = async (): Promise<{ detail: string }> => {
  const res = await api(`/api/oauth2`, { method: 'GET' })
  return res.json()
}

// TODO Move these to the types file
export const getPermissionsListUi = async (): Promise<{
  [key: string]: { [key: string]: string }[]
}> => {
  const res = await api(`/api/permissions_ui`, {
    method: 'GET'
  })
  return res.json()
}

// TODO Rename this to just getSubjectList
export const getSubjectsListUi = async (): Promise<
  Array<Record<string, string | undefined>>
> => {
  const res = await api(`/api/subjects`, {
    method: 'GET'
  })
  return res.json()
}

export const getDatasetsUi = async (): Promise<{
  [key: string]: { dataset: string; version: string }[]
}> => {
  const res = await api(`/api/datasets_ui`, {
    method: 'GET'
  })
  return res.json()
}

export const getAllJobs = async (): Promise<AllJobsResponse> => {
  const res = await api(`/api/jobs`, {
    method: 'GET'
  })
  return res.json()
}

export const getJob = async ({ queryKey }): Promise<JobResponse> => {
  const [_, jobId] = queryKey
  const res = await api(`/api/jobs/${jobId}`, {
    method: 'GET'
  })
  return res.json()
}

export const getSubjectPermissions = async ({ queryKey }): Promise<string[]> => {
  const [_, subjectId] = queryKey
  const res = await api(`/api/permissions/${subjectId}`, {
    method: 'GET'
  })
  return res.json()
}

export const getMetadataSearch = async ({
  queryKey
}): Promise<MetadataSearchResponse> => {
  const [_, search] = queryKey
  const res = await api(`/api/datasets/search/${search}`, {
    method: 'GET'
  })
  return res.json()
}

export const createClient = async ({
  path,
  data
}: {
  path: string
  data: ClientCreateBody | UserCreateBody
}) => {
  const res = await api(`/api/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const updateSubjectPermissions = async (
  data: UpdateSubjectPermissionsBody
): Promise<UpdateSubjectPermissionsResponse> => {
  const res = await api(`/api/subjects/permissions`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const uploadDataset = async ({ path, data }: { path: string; data: FormData }) => {
  const res = await api(`/api/datasets/${path}`, {
    method: 'POST',
    body: data
  })
  return res.json()
}

export const getDatasetInfo = async ({ queryKey }): Promise<DatasetInfoResponse> => {
  const [_, domain, dataset, version] = queryKey
  const res = await api(`/api/datasets/${domain}/${dataset}/info?version=${version}`, {
    method: 'GET'
  })
  return res.json()
}

export const queryDataset = async ({
  path,
  dataFormat,
  data
}: {
  path: string
  dataFormat: DataFormats
  data: unknown
}) => {
  const acceptHeader = dataFormat === 'json' ? 'application/json' : 'text/csv'
  const res = await api(`/api/datasets/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: acceptHeader
    },
    body: JSON.stringify(data)
  })
  return res
}

export const generateSchema = async ({
  path,
  data
}: {
  path: string
  data: FormData
}) => {
  const res = await api(`/api/schema/${path}`, {
    method: 'POST',
    body: data
  })
  return res.json()
}

export const createSchema = async (
  data: GenerateSchemaResponse
): Promise<CreateSchemaResponse> => {
  const res = await api(`/api/schema`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}
