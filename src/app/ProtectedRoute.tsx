import { Navigate } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import { LoadingScreen } from '@/shared/ui/loading-screen'

interface RouteProps {
  children: React.ReactNode
}

export function RequireAuth({ children }: RouteProps) {
  const authStatus = useAppStore((s) => s.authStatus)
  const idInstance = useAppStore((s) => s.idInstance)

  const isChecking = authStatus === 'checking' || (authStatus === 'idle' && Boolean(idInstance))

  if (isChecking) return <LoadingScreen />
  if (authStatus !== 'authorized') return <Navigate to="/" replace />

  return <>{children}</>
}

export function RequireGuest({ children }: RouteProps) {
  const authStatus = useAppStore((s) => s.authStatus)
  const idInstance = useAppStore((s) => s.idInstance)

  const isChecking = authStatus === 'checking' || (authStatus === 'idle' && Boolean(idInstance))

  if (isChecking) return <LoadingScreen />
  if (authStatus === 'authorized') return <Navigate to="/chat" replace />

  return <>{children}</>
}
