import { useState, type SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Alert, AlertDescription } from '@/shared/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

export function LoginPage() {
  const navigate = useNavigate()
  const login = useAppStore((s) => s.login)
  const authStatus = useAppStore((s) => s.authStatus)
  const authError = useAppStore((s) => s.authError)

  const [idInstance, setIdInstance] = useState('')
  const [apiTokenInstance, setApiTokenInstance] = useState('')

  const isLoading = authStatus === 'checking'

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const success = await login(idInstance.trim(), apiTokenInstance.trim())
    if (success) {
      navigate('/chat')
    }
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="border-border bg-card w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Вход в GREEN-API</CardTitle>
          <CardDescription>Введите параметры доступа из личного кабинета</CardDescription>
        </CardHeader>
        <CardContent>
          <form key="login-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              name="idInstance"
              placeholder="idInstance"
              autoComplete="on"
              value={idInstance}
              onChange={(e) => setIdInstance(e.target.value)}
              required
              disabled={isLoading}
            />
            <Input
              type="password"
              name="apiTokenInstance"
              autoComplete="off"
              placeholder="apiTokenInstance"
              value={apiTokenInstance}
              onChange={(e) => setApiTokenInstance(e.target.value)}
              required
              disabled={isLoading}
            />

            {authError && (
              <Alert variant="destructive">
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Проверка…' : 'Войти'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
