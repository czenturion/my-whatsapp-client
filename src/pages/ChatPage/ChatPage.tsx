import { useState } from 'react'
import { Plus, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import { resolveApiUrl } from '@/shared/lib/resolveApiUrl'
import { useNotificationPolling } from '@/features/message-polling/useNotificationPolling'
import { CreateChatDialog } from '@/features/create-chat/CreateChatDialog'
import { SendMessageForm } from '@/features/send-message/SendMessageForm'
import { ChatHeader } from '@/entities/chat/ChatHeader'
import { ChatListItem } from '@/entities/chat/ChatListItem'
import { MessageList } from '@/entities/message/MessageList'
import { Button } from '@/shared/ui/button'

export function ChatPage() {
  const navigate = useNavigate()
  const idInstance = useAppStore((s) => s.idInstance)
  const apiTokenInstance = useAppStore((s) => s.apiTokenInstance)
  const authStatus = useAppStore((s) => s.authStatus)
  const chatId = useAppStore((s) => s.chatId)
  const messages = useAppStore((s) => s.messages)
  const addMessage = useAppStore((s) => s.addMessage)
  const logout = useAppStore((s) => s.logout)

  const [dialogOpen, setDialogOpen] = useState(false)

  useNotificationPolling({
    apiUrl: idInstance ? resolveApiUrl(idInstance) : null,
    idInstance,
    apiTokenInstance,
    enabled: authStatus === 'authorized',
    onIncomingMessage: (msg) => {
      if (msg.chatId !== chatId) return
      addMessage({
        id: `${msg.chatId}-${msg.timestamp}`,
        chatId: msg.chatId,
        text: msg.text,
        timestamp: msg.timestamp,
        isOutgoing: false,
        senderName: msg.senderName,
      })
    },
  })

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="bg-background flex h-screen">
      {/* Левая панель — список чатов */}
      <aside className="border-border bg-max-panel flex w-80 shrink-0 flex-col border-r">
        <div className="border-border flex items-center justify-between border-b px-4 py-4">
          <h1 className="text-lg font-semibold">Чаты</h1>
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setDialogOpen(true)}
              title="Новый чат"
              aria-label="Новый чат"
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleLogout}
              title="Выйти"
              aria-label="Выйти"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {chatId ? (
            <ChatListItem chatId={chatId} isActive />
          ) : (
            <p className="text-muted-foreground p-4 text-center text-sm">
              Нет активных чатов. Нажмите + чтобы создать.
            </p>
          )}
        </div>
      </aside>

      {/* Правая панель — активный чат */}
      <main className="flex flex-1 flex-col">
        {chatId ? (
          <>
            <ChatHeader chatId={chatId} />
            <MessageList messages={messages} />
            <SendMessageForm />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-muted-foreground">Выберите чат или создайте новый</p>
          </div>
        )}
      </main>

      <CreateChatDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
