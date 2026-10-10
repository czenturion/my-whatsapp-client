# WhatsApp Client

Веб-клиент для отправки и получения сообщений WhatsApp через [GREEN-API](https://green-api.com/). Интерфейс сделан по мотивам [web.max.ru](https://web.max.ru/) — тёмная тема, две колонки, минимализм.

## Что умеет

- Логин по `idInstance` и `apiTokenInstance` из кабинета GREEN-API
- Создание чата по номеру телефона
- Отправка и приём текстовых сообщений
- Long-polling для входящих — сообщения подтягиваются сами
- Сессия и история переживают перезагрузку страницы

## Стек

React 19 + TypeScript, Vite 8, Tailwind CSS 4, shadcn/ui на Base UI, Zustand, React Router, Axios. Архитектура — упрощённый Feature-Sliced Design.

## Запуск

Нужен Node.js 20.19+ или 22.12+.

```bash
git clone https://github.com/czenturion/my-whatsapp-client.git
cd my-whatsapp-client
npm install
npm run dev
```

Откроется на [http://localhost:5173](http://localhost:5173).

Сборка и проверки:

```bash
npm run build     # прод-сборка
npm run lint      # ESLint
npm run format    # Prettier
```

## Как пользоваться

1. Открываешь сайт — попадаешь на страницу входа.
2. Вводишь `idInstance` и `apiTokenInstance` из [личного кабинета GREEN-API](https://console.green-api.com/).
3. После входа нажимаешь **+** слева, вводишь номер получателя в международном формате (`79258934848`) — создаётся чат.
4. Пишешь сообщение, отправляешь.
5. Ответы приходят автоматически.

Инстанс должен быть авторизован в кабинете GREEN-API. При входе приложение само вызывает `SetSettings` с пустым `webhookUrl`, чтобы перевести инстанс в режим HTTP API — иначе входящие не будут доходить.

## Структура

```
src/
├── app/          # точка входа, роутер
├── pages/        # LoginPage, ChatPage
├── features/     # create-chat, send-message, message-polling
├── entities/     # chat, message
├── shared/       # api, lib, types, ui
├── store/        # zustand
└── index.css     # tailwind + тема
```

## Что под капотом

Используются методы GREEN-API: `GetStateInstance`, `SetSettings`, `SendMessage`, `ReceiveNotification`, `DeleteNotification`.

Лонг-поллинг реализован через `AbortController` — при размонтировании компонента текущий запрос отменяется, утечек нет.

## Демо

🔗 [my-whatsapp-client.vercel.app](https://my-whatsapp-client.vercel.app/)
