import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getStateInstance, setSettings } from '@/shared/api/greenApi'
import { ApiError } from '@/shared/api/ApiError'
import { resolveApiUrl } from '@/shared/lib/resolveApiUrl'
import type { ChatMessage } from '@/shared/types'

type AuthStatus = 'idle' | 'checking' | 'authorized' | 'error'

interface AppState {
  idInstance: string
  apiTokenInstance: string
  authStatus: AuthStatus
  authError: string | null
  chatId: string | null
  messages: ChatMessage[]

  login: (idInstance: string, apiTokenInstance: string) => Promise<boolean>
  logout: () => void
  setChatId: (chatId: string) => void
  addMessage: (message: ChatMessage) => void
  clearMessages: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      idInstance: '',
      apiTokenInstance: '',
      authStatus: 'idle',
      authError: null,
      chatId: null,
      messages: [],

      login: async (idInstance, apiTokenInstance) => {
        set({ authStatus: 'checking', authError: null })
        try {
          const apiUrl = resolveApiUrl(idInstance)

          const { stateInstance } = await getStateInstance(apiUrl, idInstance, apiTokenInstance)

          if (stateInstance !== 'authorized') {
            set({
              authStatus: 'error',
              authError: `Инстанс не авторизован. Статус: ${stateInstance}`,
            })
            return false
          }

          await setSettings(apiUrl, idInstance, apiTokenInstance, {
            webhookUrl: '',
            outgoingWebhook: 'yes',
            stateWebhook: 'yes',
            incomingWebhook: 'yes',
          })

          set({
            idInstance,
            apiTokenInstance,
            authStatus: 'authorized',
          })
          return true
        } catch (error: unknown) {
          const message =
            error instanceof ApiError ? error.message : 'Не удалось подключиться к GREEN-API'
          set({ authStatus: 'error', authError: message })
          return false
        }
      },

      logout: () =>
        set({
          idInstance: '',
          apiTokenInstance: '',
          authStatus: 'idle',
          authError: null,
          chatId: null,
          messages: [],
        }),

      setChatId: (chatId) => set({ chatId, messages: [] }),

      addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),

      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'green-api-storage',
      partialize: (state) => ({
        idInstance: state.idInstance,
        apiTokenInstance: state.apiTokenInstance,
        chatId: state.chatId,
        messages: state.messages,
      }),
    }
  )
)
