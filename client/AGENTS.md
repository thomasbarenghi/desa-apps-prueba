# AGENTS.md — Frontend (client)

## Antes de empezar

1. **Leer `CLAUDE.md`** en esta carpeta. Es la fuente de verdad de las reglas del frontend.
2. Leer el `CLAUDE.md` de la raíz del proyecto (`../CLAUDE.md`) para las reglas globales.
3. Si el trabajo toca el backend, leer `api/CLAUDE.md` y sus skills en `api/.claude/skills/`.

## Alcance

Esta carpeta (`client/`) contiene únicamente las aplicaciones de frontend (monorepo Turborepo). La documentación de arquitectura del proyecto está en `plan/api/base.md`.

## Aplicaciones

- `apps/store` — Aplicación cliente (Vite + React + Chakra UI) — puerto 5173.
- `apps/admin` — Aplicación administrativa (Vite + React + Chakra UI) — puerto 5174.

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

## Reglas

- Consumir la API desde `/api` (proxy de Vite apunta al backend en `api/`).
- Stack: Chakra UI v3, SWR (fetching), Zustand (estado global), React Router.
- No crear archivos en `agent-local/` (carpeta local del agente, no se pushea).
- Calidad: ESLint/Prettier compartidos; husky global corre lint en commit y build+lint en push.
