export type InstanceState =
  | 'notAuthorized'
  | 'authorized'
  | 'blocked'
  | 'sleepMode'
  | 'starting'

export interface InstanceStateResponse {
  stateInstance: InstanceState
}

export interface SendMessageRequest {
  chatId: string
  message: string
}

export interface SendMessageResponse {
  idMessage: string
}

export interface NotificationBody {
  typeWebhook: string
  instanceData: {
    idInstance: number
    wid: string
    typeInstance: string
  }
  timestamp: number
  idMessage: string
  senderData: {
    chatId: string
    sender: string
    senderName: string
  }
  messageData: {
    typeMessage: string
    textMessageData?: {
      textMessage: string
    }
  }
}

export interface ReceiveNotificationResponse {
  receiptId: number
  body: NotificationBody
}

export interface ChatMessage {
  id: string
  chatId: string
  text: string
  timestamp: number
  isOutgoing: boolean
  senderName?: string
}