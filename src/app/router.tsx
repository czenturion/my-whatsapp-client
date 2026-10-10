import { createBrowserRouter } from 'react-router-dom'
import { LoginPage } from '@/pages/LoginPage/LoginPage'
import { ChatPage } from '@/pages/ChatPage/ChatPage'
import { RequireAuth, RequireGuest } from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireGuest>
        <LoginPage />
      </RequireGuest>
    ),
  },
  {
    path: '/chat',
    element: (
      <RequireAuth>
        <ChatPage />
      </RequireAuth>
    ),
  },
])
