# Plan de trabajo — DESA Apps (front + back)

**Proyecto:** DESA Apps — Plataforma de pedidos (UNaHur)
**Equipo:** Thomas (SSR), Mateo (Trainee), Bosco (Trainee)
**Fuente:** `plan/api/base.md`, `plan/api/avance.md`, `client/docs/requerimientos-funcionales.md`, `client/docs/ui-manifesto.md`

**Modalidad:** todo se construye con **IA de corrido**. El equipo define el requisito, la IA lo implementa de punta a punta (backend + frontend) y el equipo revisa y valida. No hay dueños por módulo: se avanza por **flujos verticales completos**.

---

## Estado actual (hecho)

### Backend (`api/`)

- Arquitectura multicapa: `controller → orchestrator → service → repository`, con patrón **Orchestrator** (un servicio primario nunca llama a otro).
- Módulos, modelos, DTOs, repos en memoria y endpoints ya creados (ver `avance.md`).
- Skills y documentación de arquitectura actualizados.

### Frontend (`client/`)

- Monorepo **Turborepo**: `apps/{auth, store, admin}` + `packages/{components, domain, api, theme, eslint-config, typescript-config}`.
- **Store (terminada):** catálogo, carrito, checkout, pedidos, perfil, direcciones y sucursales. Rediseño "Calor", tokens de UI, layouts unificados, validación con **React Hook Form + Zod**.
- **Auth (terminada):** app dedicada (`apps/auth`) con login/registro/recuperación y redirección por `role` (cliente → store, admin → admin).
- **Paquetes compartidos (terminados):** `@repo/components` (tokens de UI), `@repo/domain` (tipos + schemas), `@repo/api` (hooks + mocks + sesión), `@repo/theme` (tokens Chakra).

---

## Pendientes

### Backend (`api/`)

| Área | Detalle | Referencia |
|---|---|---|
| Lógica de negocio | `CheckoutOrchestrator`, máquina de estados, asignación de sucursal, ETA, carrito | `base.md` §6–§7 |
| Persistencia | ORM (TypeORM/Prisma), migraciones, repos reales | `avance.md` §6.2 |
| Autenticación real | JWT, refresh, guards, roles, admin inicial | RF-001..RF-010 |
| Tests | Unit (servicios/orchestrators) y e2e | — |

### Frontend — Admin (`apps/admin`)

Pantallas del sistema administrativo (ver `requerimientos-funcionales.md` §7): categorías, productos + configuraciones, sucursales + horarios, stock, promociones, estados/parámetros, pedidos (gestión de estados), reportes y usuarios/admin. Usa `RequireAuth roles=["admin"]` y los tokens de `@repo/components`.

### Frontend — Rider (`apps/rider`) — nuevo

App del repartidor (no está en el spec base; es un pendiente acordado):

- Ver pedidos asignados.
- Aceptar / rechazar pedido.
- Marcar "en camino" y "entregado".
- Ver detalle de entrega (direcciones de sucursal y cliente, mapa).

---

## Cómo se trabaja (IA de corrido)

1. Se define el flujo/requisito (backend + frontend juntos).
2. La IA lo implementa de punta a punta, respetando arquitectura, tokens y validación existentes.
3. El equipo revisa, corrige y valida.
4. La coordinación entre módulos la hace siempre el **orchestrator** (regla de arquitectura).

---

## Etapas restantes

| Etapa | Contenido |
|---|---|
| 1 — Backend | Lógica de negocio + persistencia (ORM) + auth real + tests |
| 2 — Admin | Pantallas administrativas completas (`apps/admin`) |
| 3 — Rider | App del repartidor (`apps/rider`) |
| 4 — Integración | Integración frontend–backend + demo + documentación de API |

---

## Sprints (consigna de la materia)

La evaluación es **grupal**. Los objetivos de cada sprint son acumulativos y se miden sobre la implementación total.

| Sprint | Objetivo |
|---|---|
| **Sprint 1** | Implementación preliminar que cubra **todos los puntos obligatorios** salvo a lo sumo dos, cubriendo cada uno al menos en un **40%**. |
| **Sprint 2** | Mejoras en la **experiencia de usuario**, **validaciones**, **datos de prueba**. |
| **Sprint 3** | Implementación al **60%**, incluyendo **agregados** propuestos en reuniones anteriores; **documentación de tests funcionales**. |
| **Sprint 4** | Implementación al **80%**, incluyendo agregados propuestos; **responsiveness**. |
| **Sprint 5** | Implementación al **100%**, incluyendo agregados propuestos; **documentación de API**; **presentación**. |

### Reglas de evaluación (riesgo)

- No llegar a **un** sprint → baja **1 punto** a todos los integrantes.
- No llegar a **dos** sprints → baja **2 puntos** a todos los integrantes.
- No llegar a **tres** sprints → se pierde la cursada (posible instancia de recuperación).

> Conclusión operativa: el Sprint 1 es crítico. El 100% del foco debe estar en **cubrir cada punto obligatorio al 40%**, antes que en pulir o agregar funcionalidad. Los "agregados" se reservan para Sprint 3 en adelante.

---

## Puntos obligatorios (base para medir la cobertura del 40%)

La consigna mide "puntos obligatorios" sobre los requerimientos base (`base.md` §4). Referencia para el control de cobertura:

| Grupo | Puntos | RF |
|---|---|---|
| Gestión de usuarios | 10 | RF-001..RF-010 |
| Direcciones y geolocalización | 6 | RF-011..RF-016 |
| Sucursales | 9 | RF-017..RF-025 |
| Categorías y productos | 12 | RF-026..RF-037 |
| Carrito de compras | 10 | RF-038..RF-047 |
| Realización de pedidos | 12 | RF-048..RF-059 |
| Seguimiento e historial | 8 | RF-060..RF-067 |
| Sistema administrativo | 13 | RF-068..RF-080 |
| Reportes base | 4 | RF-081..RF-084 |
| Restricciones de arquitectura | 6 | RA-001..RA-006 |

> En Sprint 1, cada RF debe tener al menos **endpoint + lógica básica funcionando** (40%). No hace falta que esté pulido: alcanza con que demuestre el caso de uso mínimo.

---

## Plan por sprint

> Con IA de corrido: cada sprint avanza **flujos verticales completos** (backend + frontend), priorizando la cobertura de puntos obligatorios. No hay dueños por módulo.

### Sprint 1 — Implementación preliminar (cobertura 40% de puntos obligatorios)

Objetivo: lógica de negocio básica de punta a punta + UI mínima que consuma la API.

| Frente | Contenido |
|---|---|
| Backend | Auth básico (JWT/guards/roles + seed del admin), `CheckoutOrchestrator` básico (validar cliente/dirección/carrito → pedido + estado inicial), asignación de sucursal simple, máquina de estados básica, CRUD de categorías/productos/configs/sucursales/stock/promociones, carrito, consulta de pedidos y reportes básicos |
| Admin | Shell + pantallas básicas: categorías, productos, configuraciones, sucursales, stock, promociones, pedidos y reportes |
| Rider | Shell + pedidos asignados + aceptar/rechazar + "en camino"/"entregado" básicos |

### Sprint 2 — UX + validaciones + datos de prueba

| Frente | Contenido |
|---|---|
| Backend | Validaciones: email único, credenciales, transiciones de estado, reglas de checkout/CRUD/carrito |
| Frontend | Validación por campo (ya montada con RHF + Zod), toasts de éxito, estados empty/error/loading, confirmaciones destructivas |
| Datos | Seed: sucursales con horarios, categorías, productos con imágenes y configs, admin inicial, clientes y riders de prueba |

### Sprint 3 — 60% + agregados + documentación de tests funcionales

| Frente | Contenido |
|---|---|
| Backend | Completar checkout (ETA real, snapshot de detalle, carrito confirmado), máquina de estados completa, repetir pedido |
| Frontend | Completar admin (filtros, reportes) y rider; cerrar flujo de pedido en store |
| QA | Documentar tests funcionales (casos por RF/HU) |

### Sprint 4 — 80% + agregados + responsiveness

| Frente | Contenido |
|---|---|
| Backend | Integración final entre módulos, ajustes de arquitectura |
| Frontend | Responsive completo (390px mobile y desktop) en store, admin y rider |

### Sprint 5 — 100% + documentación de API + presentación

| Frente | Contenido |
|---|---|
| Backend | Documentación de API (OpenAPI/Swagger o md por endpoint) |
| Frontend | Cierre e integración final de las tres apps |
| General | Verificación del 100% de RF/RA, demo completa (flujo de `base.md` §13), preparación de la presentación |

---

## Orden de prioridades ante desvíos

Si el sprint se atrasa, priorizar en este orden para no perder puntos:

1. Cobertura de **puntos obligatorios** (Sprint 1: 40% de cada RF).
2. Validaciones y datos de prueba (Sprint 2).
3. Tests funcionales documentados (Sprint 3).
4. Responsiveness (Sprint 4).
5. Agregados y documentación de API (Sprint 3–5).

> Regla de oro: los **agregados** son opcionales y van al final; nunca deben comprometer la cobertura de los puntos obligatorios ni los objetivos de cada sprint.
