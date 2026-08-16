# División de tareas sugerida — 3 integrantes (front + back)

**Proyecto:** DESA Apps — Plataforma de pedidos (UNaHur)
**Equipo:** Thomas (SSR), Mateo (Trainee), Bosco (Trainee)
**Fuente:** `plan/api/base.md` (secciones 11 y 12), `plan/client/especificacion_frontends_tienda_admin_solo_base.md` (sección 13) y `plan/api/avance.md` (estado actual).

> Contexto de `avance.md`: la estructura, modelos, DTOs, repos en memoria y endpoints ya existen. Lo pendiente es **lógica de negocio**, **persistencia (ORM)**, **autenticación real**, **frontend real** y **tests**. La división está orientada a completar ese pendiente.

---

## Criterio de división

- **Por flujos verticales** (módulo completo de punta a punta), no por tipo de archivo.
- Cada integrante es dueño de **sus módulos de backend y sus pantallas de frontend**.
- La coordinación entre módulos la hace siempre el **orchestrator** (nunca un servicio primario llamando a otro).

---

## 1. Thomas — SSR (arquitectura + núcleo de pedidos)

### Backend (`api/`)

| Área | Módulo / caso de uso | Referencia |
|---|---|---|
| Arquitectura | Definición y mantenimiento de capas y módulos | `base.md` §2 |
| Auth | `AuthOrchestrator`, hash de password, JWT, guards, roles, admin inicial (seed) | RF-001..RF-010 |
| Recuperación | `PasswordRecoveryService` + token | RF-006 |
| Pedidos (núcleo) | `CheckoutOrchestrator` (ex `OrderOrchestrator`): validar cliente/dirección/carrito/productos | HU-C13, RF-048..059 |
| Asignación | Elegir sucursal activa y abierta más cercana (distancia máxima) | RF-050, HU-S01 |
| Cálculos | Total del pedido + tiempo estimado (ETA) | HU-S02, HU-S04 |
| Estados | Máquina de estados: validar transiciones + `OrderStatusOrchestrator` | RF-080, HU-S03 |
| Persistencia | Integrar ORM (TypeORM/Prisma), migraciones y repos reales | `avance.md` §6.2 |
| Integración | Integración final entre módulos y revisión técnica de Mateo y Bosco | — |

### Frontend (`client/`)

| Área | Pantallas / componentes | Referencia |
|---|---|---|
| Base técnica | Turborepo, tema, Chakra, estructura de las dos apps | UI Manifesto |
| Routing | Routers, guards (`GuestRoute`, `CustomerRoute`, `AdminRoute`) | §3.1 |
| Sesión | Cliente HTTP (`shared/api`), manejo de sesión y refresh | §11.2 |
| Compartidos | Componentes críticos y sistema de diseño base | §4.5 |
| Checkout | Confirmación del pedido (dirección + resumen) | T-10, T-11 |
| Pedidos | Pedido confirmado, seguimiento y cambio de estados (admin) | T-12, T-13, A-14 |
| Revisión | Revisión e integración de PRs | — |

---

## 2. Mateo — Trainee (catálogo + administración)

### Backend (`api/`)

| Área | Módulo / caso de uso | Referencia |
|---|---|---|
| Categorías | `CategoryService` (ABM + estado) | RF-026, RF-027 |
| Productos | `ProductService` (ABM + disponibilidad) | RF-028..RF-035 |
| Configuraciones | `ProductConfigurationService` (grupos/opciones, precio extra) | RF-036, RF-037 |
| Sucursales | `BranchService` + `BranchHourService` (ABM + horarios) | RF-017..RF-025 |
| Stock | `StockService` (ABM stock general) | RF-074 |
| Promociones | `PromotionService` (ABM dato general) | RF-072 |
| Estados/Parámetros | `GeneralStateService` y `SystemParameterService` | RF-076, RF-077 |

### Frontend (`client/` — admin)

| Área | Pantallas | Referencia |
|---|---|---|
| Categorías | Lista + formulario | A-03, A-04 |
| Productos | Lista + formulario + configuraciones | A-05, A-06, A-07 |
| Sucursales | Lista + formulario + horarios | A-08, A-09 |
| Stock | Stock general + edición | A-10 |
| Promociones | Lista + formulario | A-11, A-12 |
| Reportes | Reportes base de productos | A-19 |

---

## 3. Bosco — Trainee (cliente: perfil + carrito + consultas)

### Backend (`api/`)

| Área | Módulo / caso de uso | Referencia |
|---|---|---|
| Perfil | `UserService` (consulta/modificación del propio perfil) | RF-007 |
| Direcciones | `AddressService` (ABM + lat/lng) | RF-011..RF-014 |
| Sucursales disponibles | `BranchAvailabilityOrchestrator` (sucursales por ubicación) | RF-015, HU-C06 |
| Catálogo | `CatalogQueryOrchestrator` (categorías/productos disponibles) | RF-035, HU-C07 |
| Carrito | `CartService` + `CartOrchestrator` (ítems, cantidad, obs, configs, total) | RF-038..RF-047, HU-S02 |
| Consulta de pedidos | `OrderQueryOrchestrator` (seguimiento + historial) | RF-060..RF-065 |
| Repetición | `RepeatOrderOrchestrator` (repetir pedido con productos disponibles) | RF-066, RF-067 |
| Reportes | `ReportService` (consultas sobre pedidos entregados) | RF-081..RF-084 |

### Frontend (`client/` — store)

| Área | Pantallas | Referencia |
|---|---|---|
| Auth cliente | Registro, login, recuperación y restablecimiento | T-01..T-04 |
| Catálogo | Inicio + catálogo + detalle de producto | T-05, T-06, T-07 |
| Carrito | Carrito | T-09 |
| Perfil | Perfil + direcciones (lista y formulario) | T-16, T-17, T-18 |
| Sucursales | Sucursales disponibles | T-08 |
| Historial | Historial y detalle de pedidos | T-14, T-15 |

---

## 4. Trabajo compartido (los tres)

- Definición de contratos entre módulos (DTOs request/response).
- Sistema de diseño, componentes base y estados loading/error/empty.
- Revisión responsive (mobile 390px y desktop).
- Cumplimiento de la regla: *un servicio primario nunca llama a otro servicio primario*.
- Integración frontend–backend y pruebas de flujos punta a punta.
- Preparación de datos y demostración final (flujo completo de la sección 13 de `base.md`).

---

## 5. Mapeo por etapas de implementación

| Etapa | Contenido | Responsables |
|---|---|---|
| 1 — Estructura y usuarios | Backend modular, BD, usuarios/roles, admin inicial, registro/login/recuperación, perfil/direcciones | Thomas + Bosco |
| 2 — Administración y catálogo | Sucursales/horarios, categorías, productos, configs, stock, promociones, estados/parámetros | Mateo (revisión Thomas) |
| 3 — Carrito y pedidos | Carrito, cálculo total, asignación de sucursal, confirmación, estados, seguimiento, repetir | Thomas + Bosco (apoyo Mateo) |
| 4 — Reportes e integración | Reportes + integración apps + demo | Los tres |

---

## 6. Objetivos por sprint (consigna de la materia)

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

## 7. Puntos obligatorios (base para medir la cobertura del 40%)

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

## 8. Plan por sprint (división front + back)

### Sprint 1 — Implementación preliminar (cobertura 40% de puntos obligatorios)

Objetivo: lógica de negocio básica de punta a punta en todos los módulos; UI mínima que consuma la API.

| Integrante | Backend (`api/`) | Frontend (`client/`) |
|---|---|---|
| **Thomas** | Auth completo básico (registro/login/JWT/guards/roles), seed del admin inicial, `CheckoutOrchestrator` básico (validar cliente/dirección/carrito → crear pedido + estado inicial), asignación de sucursal simple, máquina de estados básica | Shell de ambas apps, routing y guards, login store y admin, pantallas de checkout y seguimiento mínimas |
| **Mateo** | CRUD básico de categorías, productos, configuraciones, sucursales/horarios, stock, promociones, estados generales y parámetros | Pantallas admin básicas: categorías, productos, configuraciones, sucursales, stock, promociones, reportes |
| **Bosco** | Perfil, direcciones, carrito (agregar/editar/eliminar + total), catálogo cliente, consulta de pedidos, repetir pedido, reportes básicos | Pantallas store básicas: registro/login, catálogo, detalle de producto, carrito, perfil/direcciones, historial |

### Sprint 2 — UX + validaciones + datos de prueba

| Integrante | Backend (`api/`) | Frontend (`client/`) |
|---|---|---|
| **Thomas** | Validaciones de auth (email único, credenciales, token), transiciones de estado, reglas de checkout | Guardado de sesión, manejo de sesión vencida/403/404, estados de loading/error en flujo de pedido |
| **Mateo** | Validaciones de CRUD (campos obligatorios, rangos lat/lng, precio no negativo, horarios) | Validaciones por campo en formularios admin, confirmaciones destructivas, estados empty/error |
| **Bosco** | Validaciones de carrito (cantidad mínima, configs obligatorias, producto disponible) y direcciones | Validaciones por campo en store, toasts de éxito, estados empty/error |

**Compartido (los tres):** seed de datos de prueba (sucursales con horarios, categorías, productos con imágenes y configuraciones, admin inicial, clientes de prueba).

### Sprint 3 — 60% + agregados + documentación de tests funcionales

| Integrante | Backend (`api/`) | Frontend (`client/`) |
|---|---|---|
| **Thomas** | Completar `CheckoutOrchestrator` (ETA real, snapshot de detalle, carrito confirmado), máquina de estados completa | Completar flujo de pedido (confirmado → seguimiento → historial) |
| **Mateo** | Completar configuraciones de producto (precio extra, obligatoriedad) y stock | Completar ABM admin con filtros y reportes |
| **Bosco** | Completar carrito (recalcular total), repetir pedido (solo disponibles) | Completar catálogo, carrito, perfil y direcciones |

**Compartido (los tres):** implementar y **documentar tests funcionales** (casos de prueba por RF/HU); proponer y planificar los **agregados** de las reuniones.

### Sprint 4 — 80% + agregados + responsiveness

| Integrante | Backend (`api/`) | Frontend (`client/`) |
|---|---|---|
| **Thomas** | Integración final entre módulos, ajustes de arquitectura | Responsive de checkout/seguimiento y shell admin (sidebar drawer) |
| **Mateo** | Ajustes de CRUD y reportes según agregados | Responsive de pantallas admin (tablas scroll, menú de acciones) |
| **Bosco** | Ajustes de carrito/consultas según agregados | Responsive de store (390px): header, dock, catálogo, carrito |

**Compartido (los tres):** completar los **agregados** propuestos; revisión responsive completa (mobile 390px y desktop).

### Sprint 5 — 100% + documentación de API + presentación

| Integrante | Backend (`api/`) | Frontend (`client/`) |
|---|---|---|
| **Thomas** | Documentación de API (OpenAPI/Swagger o md por endpoint), cierre de auth/pedidos | Integración final y cierre de flujo de pedido |
| **Mateo** | Cierre de catálogo/administración y reportes | Cierre de pantallas admin y reportes |
| **Bosco** | Cierre de carrito/consultas y reportes | Cierre de pantallas store |

**Compartido (los tres):** verificación del 100% de RF y RA; demo completa (flujo de la sección 13 de `base.md`); preparación de la **presentación**.

---

## 9. Orden de prioridades ante desvíos

Si el sprint se atrasa, priorizar en este orden para no perder puntos:

1. Cobertura de **puntos obligatorios** (Sprint 1: 40% de cada RF).
2. Validaciones y datos de prueba (Sprint 2).
3. Tests funcionales documentados (Sprint 3).
4. Responsiveness (Sprint 4).
5. Agregados y documentación de API (Sprint 3–5).

> Regla de oro: los **agregados** son opcionales y van al final; nunca deben comprometer la cobertura de los puntos obligatorios ni los objetivos de cada sprint.
