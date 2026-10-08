import { useAppStore } from '@/store/useAppStore'
import { resolveApiUrl } from '@/shared/lib/resolveApiUrl'
import { useNotificationPolling } from '@/features/message-polling/useNotificationPolling'

export function ChatPage() {
  const idInstance = useAppStore((s) => s.idInstance)
  const apiTokenInstance = useAppStore((s) => s.apiTokenInstance)
  const authStatus = useAppStore((s) => s.authStatus)

  useNotificationPolling({
    apiUrl: idInstance ? resolveApiUrl(idInstance) : null,
    idInstance,
    apiTokenInstance,
    enabled: authStatus === 'authorized',
    onIncomingMessage: (msg) => {
      console.log('[incoming]', msg)
    },
  })

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <h1 className="text-foreground text-2xl font-bold">Chat Page</h1>
    </div>
  )
}
