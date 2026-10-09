import { useState, type SubmitEvent } from 'react'
import { Send } from 'lucide-react'
import { toast } from 'sonner'
import { useAppStore } from '@/store/useAppStore'
import { resolveApiUrl } from '@/shared/lib/resolveApiUrl'
import { sendMessage } from '@/shared/api/greenApi'
import { ApiError } from '@/shared/api/ApiError'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

export function SendMessageForm() {
  const idInstance = useAppStore((s) => s.idInstance)
  const apiTokenInstance = useAppStore((s) => s.apiTokenInstance)
  const chatId = useAppStore((s) => s.chatId)
  const addMessage = useAppStore((s) => s.addMessage)

  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || !chatId) return

    if (trimmed.length > 4000) {
      toast.error('Сообщение слишком длинное (максимум 4000 символов)')
      return
    }

    setSending(true)
    try {
      const { idMessage } = await sendMessage(
        resolveApiUrl(idInstance),
        idInstance,
        apiTokenInstance,
        { chatId, message: trimmed }
      )

      addMessage({
        id: idMessage,
        chatId,
        text: trimmed,
        timestamp: Math.floor(Date.now() / 1000),
        isOutgoing: true,
      })
      setText('')
    } catch (error: unknown) {
      const message = error instanceof ApiError ? error.message : 'Не удалось отправить сообщение'
      toast.error(message)
    } finally {
      setSending(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border bg-max-panel flex items-center gap-2 border-t px-4 py-3"
    >
      <Input
        type="text"
        placeholder="Сообщение"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={sending || !chatId}
        className="flex-1"
      />
      <Button type="submit" size="icon" disabled={sending || !text.trim() || !chatId}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
