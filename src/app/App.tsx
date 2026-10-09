import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/shared/ui/sonner'
import { router } from './router'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" theme="dark" />
    </>
  )
}

export default App
