import { createBrowserRouter } from 'react-router-dom'
import { LoginPage } from '@/pages/LoginPage/LoginPage'
import { ChatPage } from '@/pages/ChatPage/ChatPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
])
