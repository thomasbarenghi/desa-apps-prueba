# client

Monorepo de las aplicaciones de frontend de la plataforma de pedidos.

## Aplicaciones

- `apps/store` — Aplicación cliente (Vite + React + Chakra UI) en el puerto 5173.
- `apps/admin` — Aplicación administrativa (Vite + React + Chakra UI) en el puerto 5174.

## Paquetes

- `packages/eslint-config` — Configuración compartida de ESLint.
- `packages/typescript-config` — Configuraciones compartidas de TypeScript.

## Stack

- [Vite](https://vite.dev) + React + TypeScript
- [Chakra UI](https://chakra-ui.com) (v3)
- [SWR](https://swr.vercel.app) para fetching de datos
- [Zustand](https://zustand.docs.pmnd.rs) para estado global
- [React Router](https://reactrouter.com) para enrutado
- Turborepo como orquestador de tareas
- ESLint, Prettier y Husky con lint-staged configurados globalmente

## Comandos

```sh
npm install
npm run dev          # corre ambas apps con turbo
npm run dev -- --filter=@repo/store   # solo la tienda
npm run dev -- --filter=@repo/admin   # solo el admin
npm run build        # build de todas las apps
npm run lint         # eslint en todo el repo
npm run format       # prettier --write en todo el repo
npm run check-types  # tsc --noEmit en todas las apps
```
