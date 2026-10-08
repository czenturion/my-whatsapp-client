import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getStateInstance } from '@/shared/api/greenApi'
import { ApiError } from '@/shared/api/ApiError'
import type { ChatMessage } from '@/shared/types'

type AuthStatus = 'idle' | 'checking' | 'authorized' | 'error'

interface AppState {
  apiUrl: string
  idInstance: string
  apiTokenInstance: string
  authStatus: AuthStatus
  authError: string | null
  chatId: string | null
  messages: ChatMessage[]

  login: (
    apiUrl: string,
    idInstance: string,
    apiTokenInstance: string
  ) => Promise<boolean>
  logout: () => void
  setChatId: (chatId: string) => void
  addMessage: (message: ChatMessage) => void
  clearMessages: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      apiUrl: '',
      idInstance: '',
      apiTokenInstance: '',
      authStatus: 'idle',
      authError: null,
      chatId: null,
      messages: [],

      login: async (apiUrl, idInstance, apiTokenInstance) => {
        set({ authStatus: 'checking', authError: null })
        try {
          const { stateInstance } = await getStateInstance(
            apiUrl,
            idInstance,
            apiTokenInstance
          )

          if (stateInstance === 'authorized') {
            set({
              apiUrl,
              idInstance,
              apiTokenInstance,
              authStatus: 'authorized',
            })
            return true
          }

          set({
            authStatus: 'error',
            authError: `Инстанс не авторизован. Статус: ${stateInstance}`,
          })
          return false
        } catch (error: unknown) {
          const message =
            error instanceof ApiError
              ? error.message
              : 'Не удалось подключиться к GREEN-API'
          set({ authStatus: 'error', authError: message })
          return false
        }
      },

      logout: () =>
        set({
          apiUrl: '',
          idInstance: '',
          apiTokenInstance: '',
          authStatus: 'idle',
          authError: null,
          chatId: null,
          messages: [],
        }),

      setChatId: (chatId) => set({ chatId, messages: [] }),

      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),

      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'green-api-storage',
      partialize: (state) => ({
        apiUrl: state.apiUrl,
        idInstance: state.idInstance,
        apiTokenInstance: state.apiTokenInstance,
        chatId: state.chatId,
        messages: state.messages,
      }),
    }
  )
)