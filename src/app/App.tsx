import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/shared/ui/sonner'
import { useAppStore } from '@/store/useAppStore'
import { router } from './router'

function App() {
  const restoreSession = useAppStore((s) => s.restoreSession)

  useEffect(() => {
    restoreSession()
  }, [restoreSession])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" theme="dark" />
    </>
  )
}

export default App
