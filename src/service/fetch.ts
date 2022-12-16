import { ClientCreate, ClientResponse } from './types'
import { api } from '@/lib/data-utils'

export const createClient = async (data: ClientCreate): Promise<ClientResponse> => {
  console.log('fetch', { data })
  const res = await api('/client', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}
