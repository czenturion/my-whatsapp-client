# WhatsApp Client

Web client for sending and receiving WhatsApp messages through [GREEN-API](https://green-api.com/). The interface is inspired by [web.max.ru](https://web.max.ru/): dark theme, two columns, minimalism.

**Demo:** [my-whatsapp-client.vercel.app](https://my-whatsapp-client.vercel.app/)

## Features

- Sign in with `idInstance` and `apiTokenInstance` from the GREEN-API console
- Start a chat by phone number
- Send and receive text messages
- Long-polling for incoming messages, so new messages appear on their own
- Session and chat history survive a page reload

## Stack

React 19, TypeScript, Vite 8, Tailwind CSS 4, shadcn/ui (Base UI), Zustand, React Router, Axios. Architecture: simplified Feature-Sliced Design.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
git clone https://github.com/czenturion/my-whatsapp-client.git
cd my-whatsapp-client
npm install
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173).

Build and checks:

```bash
npm run build     # production build
npm run lint      # ESLint
npm run format    # Prettier
```

## How to use

1. Open the app, you land on the sign-in page.
2. Enter `idInstance` and `apiTokenInstance` from the [GREEN-API console](https://console.green-api.com/).
3. Click **+** on the left and enter the recipient's number in international format, digits only (`79991234567`). A chat is created.
4. Type a message and send it.
5. Replies arrive automatically.

The instance must be authorized in the GREEN-API console. On sign-in the app calls `SetSettings` with an empty `webhookUrl` to switch the instance to HTTP API mode, otherwise incoming messages would not arrive.

## Project structure

```
src/
├── app/          # entry point, router
├── pages/        # LoginPage, ChatPage
├── features/     # create-chat, send-message, message-polling
├── entities/     # chat, message
├── shared/       # api, lib, types, ui
├── store/        # zustand
└── index.css     # tailwind + theme
```

## Under the hood

GREEN-API methods used: `GetStateInstance`, `SetSettings`, `SendMessage`, `ReceiveNotification`, `DeleteNotification`.

Long-polling uses `AbortController`: when the component unmounts, the pending request is cancelled, so nothing leaks.
