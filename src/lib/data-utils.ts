import getConfig from 'next/config'
import { createUrl } from './url-utils'
import { defaultError } from '@/lang'
const { publicRuntimeConfig } = getConfig()

export type ParamsType = Record<string, string | string[] | number>

export const api = async (
  path: RequestInfo | URL,
  init: RequestInit = {},
  params?: ParamsType
): Promise<Response> => {
  const url = createUrl(`${path}`, params)
  let detailMessage
  const res: Response = await fetch(url, {
    credentials: 'include',
    ...init
  })
  if (res.ok) return res
  try {
    const { details } = await res.json()
    detailMessage = details
  } catch (e) {}
  throw new Error(detailMessage || defaultError)
}
