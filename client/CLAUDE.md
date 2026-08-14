# CLAUDE.md — Frontend (client)

Monorepo de las aplicaciones de frontend de la plataforma de pedidos (Turborepo).

## Aplicaciones

- `apps/store` — Aplicación cliente (Vite + React + Chakra UI) — puerto 5173.
- `apps/admin` — Aplicación administrativa (Vite + React + Chakra UI) — puerto 5174.

## Stack

- Vite + React + TypeScript.
- Chakra UI v3 para componentes.
- SWR para fetching de datos.
- Zustand para estado global.
- React Router para navegación.

## Estructura de cada app

```text
src/
├── components/
├── pages/
├── hooks/
├── hoc/
├── types/
└── utils/
```

## Configuración de calidad

- ESLint compartido en `packages/eslint-config` (flat config, reglas para Vite + React).
- TypeScript compartido en `packages/typescript-config` (`vite.json`, `vite-node.json`).
- Prettier: `.prettierrc.json` (sin punto y coma, single quotes).
- Husky (global en la raíz del repo): lint en commit, build + lint en push.

## Comandos

```sh
npm run dev          # corre todas las apps
npm run dev -- --filter=@repo/store
npm run dev -- --filter=@repo/admin
npm run build        # build de todas las apps
npm run lint         # eslint de todas las apps
npm run check-types  # tsc -b
npm run format       # prettier --write
```

## Reglas

- Consumir la API desde `/api` (proxy de Vite apunta al backend).
- No crear archivos en `agent-local/` (carpeta local del agente, no se pushea).
- Seguir la especificación de `plan/api/base.md`.
