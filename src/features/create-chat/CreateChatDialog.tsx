import { useState, type SubmitEvent } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'

interface CreateChatDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateChatDialog({ open, onOpenChange }: CreateChatDialogProps) {
  const setChatId = useAppStore((s) => s.setChatId)
  const [phone, setPhone] = useState('')

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const cleaned = phone.replace(/\D/g, '')
    if (!cleaned) return

    setChatId(`${cleaned}@c.us`)
    setPhone('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Новый чат</DialogTitle>
            <DialogDescription>
              Введите номер телефона получателя в международном формате
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              type="tel"
              placeholder="79258934848"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoFocus
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">
              Создать
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
