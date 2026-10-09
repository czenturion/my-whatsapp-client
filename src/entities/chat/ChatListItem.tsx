import { Avatar, AvatarFallback } from '@/shared/ui/avatar'
import { cn } from '@/shared/lib/utils'

interface ChatListItemProps {
  chatId: string
  isActive?: boolean
  onClick?: () => void
}

export function ChatListItem({ chatId, isActive = false, onClick }: ChatListItemProps) {
  const phone = chatId.split('@')[0]
  const initials = phone.slice(-2)

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors',
        isActive ? 'bg-primary/10' : 'hover:bg-muted'
      )}
    >
      <Avatar className="h-11 w-11 shrink-0">
        <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-foreground truncate text-sm font-medium">+{phone}</span>
        <span className="text-muted-foreground truncate text-xs">Нажмите, чтобы открыть</span>
      </div>
    </button>
  )
}
