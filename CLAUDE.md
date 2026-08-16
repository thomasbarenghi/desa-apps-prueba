# CLAUDE.md — Raíz del proyecto

Proyecto **DESA Apps**: plataforma de pedidos para una cadena de comidas rápidas (UNaHur).

## Estructura

```text
├── api/        # Backend NestJS (monolito multicapa con patrón Orchestrator)
├── client/     # Frontend monorepo (Turborepo): apps/store + apps/admin
├── plan/       # Documentación: especificación, diagramas, avance
└── agent-local/# Carpeta local del agente: NO se pushea (está en .gitignore)
```

## Reglas generales

1. Leer el `CLAUDE.md` y `AGENTS.md` de la carpeta en la que se trabaje (`api/`, `client/`).
2. Respetar la especificación de `plan/api/base.md` y el avance de `plan/api/avance.md`.
3. No crear archivos dentro de `agent-local/` que deban compartirse: esa carpeta **no se pushea**.
4. Los archivos que se pushean van en `api/`, `client/` o `plan/`, nunca en `agent-local/`.
5. **UI:** para cualquier trabajo visual en frontend, leer el UI Manifesto en `client/docs/ui-manifesto.md` (dirección "Calor", paleta, tipografía, patrones).

## Calidad

- Husky global: lint en `pre-commit`, build + lint en `pre-push`.
- Verificación: `npm run lint`, `npm run build` (desde la raíz corren ambos proyectos).
