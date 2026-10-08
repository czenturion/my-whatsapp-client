import axios, { type AxiosInstance, isAxiosError } from 'axios'
import { ApiError } from './ApiError'
import type {
  InstanceStateResponse,
  SendMessageRequest,
  SendMessageResponse,
  ReceiveNotificationResponse,
} from '@/shared/types'

const httpClient: AxiosInstance = axios.create({
  timeout: 30_000,
})

httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (isAxiosError(error)) {
      const status = error.response?.status
      const message = error.response?.data?.message ?? error.message
      return Promise.reject(new ApiError(message, status, error))
    }
    return Promise.reject(
      new ApiError('Unknown network error', undefined, error),
    )
  },
)

const buildUrl = (
  apiUrl: string,
  idInstance: string,
  method: string,
  token: string,
  suffix?: string,
): string => {
  const base = `${apiUrl}/waInstance${idInstance}/${method}/${token}`
  return suffix ? `${base}/${suffix}` : base
}

export const getStateInstance = async (
  apiUrl: string,
  idInstance: string,
  apiTokenInstance: string,
  signal?: AbortSignal,
): Promise<InstanceStateResponse> => {
  const { data } = await httpClient.get<InstanceStateResponse>(
    buildUrl(apiUrl, idInstance, 'getStateInstance', apiTokenInstance),
    { signal },
  )
  return data
}

export const sendMessage = async (
  apiUrl: string,
  idInstance: string,
  apiTokenInstance: string,
  payload: SendMessageRequest,
  signal?: AbortSignal,
): Promise<SendMessageResponse> => {
  const { data } = await httpClient.post<SendMessageResponse>(
    buildUrl(apiUrl, idInstance, 'sendMessage', apiTokenInstance),
    payload,
    { signal },
  )
  return data
}

export const receiveNotification = async (
  apiUrl: string,
  idInstance: string,
  apiTokenInstance: string,
  signal?: AbortSignal,
): Promise<ReceiveNotificationResponse | null> => {
  const { data } = await httpClient.get<ReceiveNotificationResponse | null>(
    buildUrl(apiUrl, idInstance, 'receiveNotification', apiTokenInstance),
    { signal },
  )
  return data
}

export const deleteNotification = async (
  apiUrl: string,
  idInstance: string,
  apiTokenInstance: string,
  receiptId: number,
  signal?: AbortSignal,
): Promise<void> => {
  await httpClient.delete(
    buildUrl(
      apiUrl,
      idInstance,
      'deleteNotification',
      apiTokenInstance,
      String(receiptId),
    ),
    { signal },
  )
}
