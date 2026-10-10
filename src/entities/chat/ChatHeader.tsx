import { Avatar, AvatarFallback } from '@/shared/ui/avatar'

interface ChatHeaderProps {
  chatId: string
}

export function ChatHeader({ chatId }: ChatHeaderProps) {
  // chatId формата "7700296849@c.us" — берём часть до @
  const phone = chatId.split('@')[0]
  const initials = phone.slice(-2)

  return (
    <div className="border-border bg-max-panel flex items-center gap-3 border-b px-4 py-4">
      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-foreground text-sm font-medium">+{phone}</span>
        <span className="text-muted-foreground text-xs">был(а) недавно</span>
      </div>
    </div>
  )
}
