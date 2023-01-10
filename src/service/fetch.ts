import env from '@beam-australia/react-env'
import { ClientCreateBody, UserCreateBody } from './types'
import { api } from '@/lib/data-utils'

const API_URL = env('API_URL')

export const getPermissionsListUi = async (): Promise<{
  [key: string]: { [key: string]: string }[]
}> => {
  const res = await api(`${API_URL}/permissions_ui`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
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
  const res = await api(`${API_URL}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}
