import type { ChatMessage } from '@/shared/types'
import { cn } from '@/shared/lib/utils'

interface MessageBubbleProps {
  message: ChatMessage
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const time = new Date(message.timestamp * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className={cn('flex w-full', message.isOutgoing ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[70%] rounded-2xl px-3.5 py-2 text-sm leading-snug',
          message.isOutgoing
            ? 'bg-max-bubble-out rounded-br-sm text-white'
            : 'bg-max-bubble-in text-foreground rounded-bl-sm'
        )}
      >
        <p className="wrap-break-word whitespace-pre-wrap">{message.text}</p>
        <span className="mt-1 block text-right text-[10px] text-white/60">{time}</span>
      </div>
    </div>
  )
}
