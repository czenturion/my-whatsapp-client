export function LoadingScreen({ message = 'Загрузка…' }: { message?: string }) {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  )
}
