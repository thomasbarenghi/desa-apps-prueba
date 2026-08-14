# AGENTS.md — Frontend (client)

## Antes de empezar

1. **Leer `CLAUDE.md`** en esta carpeta. Es la fuente de verdad de las reglas del frontend.
2. **Leer las skills** en `.claude/skills/`. La más importante para componentes es `frontend-components`.
3. **Leer `plan/client/ui-manifesto.md`** antes de tocar cualquier UI. Define la dirección visual ("Calor"), la paleta, la tipografía, la geometría y los patrones de componentes. Es la fuente de verdad visual.
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
- **Diseño:** seguir el UI Manifesto (`plan/client/ui-manifesto.md`) y usar siempre tokens semánticos de `theme.ts`. Nunca hex sueltos en el markup.

## Componentes compartidos entre apps

- Un componente (por ejemplo `Logo`) puede existir en **ambas apps** (store y admin).
- Diseñar los componentes sin acoplarlos a una app específica para poder reutilizarlos o moverlos a un paquete compartido cuando haga falta.
- Aplicar siempre la skill `frontend-components` antes de escribir o modificar componentes.
