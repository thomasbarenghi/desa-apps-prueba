# AGENTS.md — Frontend (client)

## Antes de empezar

1. **Leer `CLAUDE.md`** en esta carpeta. Es la fuente de verdad de las reglas del frontend.
2. **Leer las skills** en `.claude/skills/`. La más importante para componentes es `frontend-components`.
3. **Leer `client/docs/ui-manifesto.md`** antes de tocar cualquier UI. Define la dirección visual ("Calor"), la paleta, la tipografía, la geometría y los patrones de componentes. Es la fuente de verdad visual.
4. Leer el `CLAUDE.md` de la raíz del proyecto (`../CLAUDE.md`) para las reglas globales.
5. Si el trabajo toca el backend, leer `api/CLAUDE.md` y sus skills en `api/.claude/skills/`.

## Skills de diseño

- `interface-design`, `better-ui`, `impeccable` — para decisión visual, polish y revisión de UI.
- `frontend-components` — estructura, named exports, SOC, Chakra siempre, Zustand, layouts.

## Alcance

Esta carpeta (`client/`) contiene únicamente las aplicaciones de frontend (monorepo Turborepo). La documentación de arquitectura del proyecto está en `plan/api/base.md`.

## Aplicaciones

- `apps/store` — Aplicación cliente (Vite + React + Chakra UI) — puerto 5173.
- `apps/admin` — Aplicación administrativa (Vite + React + Chakra UI) — puerto 5174.

## Estructura de cada app

```text
src/
├── components/
├── layouts/
├── pages/
├── hooks/
├── stores/
├── hoc/
├── types/
└── utils/
```

## Reglas

- Consumir la API desde `/api` (proxy de Vite apunta al backend en `api/`).
- Stack: Chakra UI v3, SWR (fetching), Zustand (estado global), React Router.
- No crear archivos en `agent-local/` (carpeta local del agente, no se pushea).
- Calidad: ESLint/Prettier compartidos; husky global corre lint en commit y build+lint en push.
- **Diseño:** seguir el UI Manifesto (`client/docs/ui-manifesto.md`) y usar siempre tokens semánticos de `theme.ts`. Nunca hex sueltos en el markup.

## Componentes y paquetes compartidos

- Los componentes UI genéricos viven en `@repo/components`; los tipos/constantes de dominio en `@repo/domain`; la capa de datos (hooks + mocks) en `@repo/api`; los tokens en `@repo/theme`. Ver `CLAUDE.md`.
- Un componente lo necesita más de una app (store, admin, rider) → moverlo a `@repo/components` y exportarlo por el barrel `packages/components/src/index.ts`.
- Los componentes compartidos usan tokens por string (`"brand.500"`); no importan `@repo/theme`.
- Consumir desde el barrel: `import { Logo } from "@repo/components"`.
- Aplicar siempre la skill `frontend-components` antes de escribir o modificar componentes.
