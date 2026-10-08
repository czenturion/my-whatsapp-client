import { useEffect, useRef } from 'react'
import { receiveNotification, deleteNotification } from '@/shared/api/greenApi'

export interface IncomingMessage {
  chatId: string
  text: string
  timestamp: number
  senderName: string
}

interface UseNotificationPollingOptions {
  apiUrl: string | null
  idInstance: string | null
  apiTokenInstance: string | null
  onIncomingMessage: (message: IncomingMessage) => void
  enabled?: boolean
}

export function useNotificationPolling({
  apiUrl,
  idInstance,
  apiTokenInstance,
  onIncomingMessage,
  enabled = true,
}: UseNotificationPollingOptions) {
  const callbackRef = useRef(onIncomingMessage)
  useEffect(() => {
    callbackRef.current = onIncomingMessage
  }, [onIncomingMessage])

  useEffect(() => {
    if (!enabled || !apiUrl || !idInstance || !apiTokenInstance) return

    let active = true
    const controller = new AbortController()

    const poll = async () => {
      while (active) {
        try {
          const notification = await receiveNotification(
            apiUrl,
            idInstance,
            apiTokenInstance,
            controller.signal
          )

          if (!active) return

          if (!notification) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            continue
          }

          const { body, receiptId } = notification

          if (
            body.typeWebhook === 'incomingMessageReceived' &&
            body.messageData.typeMessage === 'textMessage' &&
            body.messageData.textMessageData
          ) {
            callbackRef.current({
              chatId: body.senderData.chatId,
              text: body.messageData.textMessageData.textMessage,
              timestamp: body.timestamp,
              senderName: body.senderData.senderName,
            })
          }

          await deleteNotification(
            apiUrl,
            idInstance,
            apiTokenInstance,
            receiptId,
            controller.signal
          )
        } catch (error) {
          if (!active) return
          console.error('[notification-polling]', error)

          await new Promise((resolve) => setTimeout(resolve, 3000))
        }
      }
    }

    poll()

    return () => {
      active = false
      controller.abort()
    }
  }, [apiUrl, idInstance, apiTokenInstance, enabled])
}
