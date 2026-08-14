# Plataforma de pedidos — DESA Apps

Proyecto de la materia **Desarrollo de Aplicaciones — UNaHur**.

Una plataforma de pedidos para una cadena de comidas rápidas con dos aplicaciones (cliente y administración) que consumen una única API backend y comparten una misma base de datos.

```text
Aplicación Cliente (apps/store)  ─┐
                                 ├─> API (api/) ──> Base de datos compartida
Aplicación Administrativa (apps/admin) ─┘
```

---

## Tabla de contenidos

1. [Qué es este repo](#1-qué-es-este-repo)
2. [Qué es un monorepo y Turborepo](#2-qué-es-un-monorepo-y-turborepo)
3. [Stack del proyecto](#3-stack-del-proyecto)
4. [Estructura del repo](#4-estructura-del-repo)
5. [Backend: NestJS y su filosofía](#5-backend-nestjs-y-su-filosofía)
   - [Qué es NestJS](#51-qué-es-nestjs)
   - [Las capas del backend](#52-las-capas-del-backend)
   - [El patrón Orchestrator](#53-el-patrón-orchestrator)
   - [Los módulos](#54-los-módulos)
6. [Frontend: Vite + React + Chakra UI](#6-frontend-vite--react--chakra-ui)
7. [Cómo levantar el proyecto](#7-cómo-levantar-el-proyecto)
8. [Comandos útiles](#8-comandos-útiles)
9. [Calidad: ESLint, Prettier y Husky](#9-calidad-eslint-prettier-y-husky)
10. [Dónde está la documentación](#10-dónde-está-la-documentación)
11. [Estado actual y próximos pasos](#11-estado-actual-y-próximos-pasos)

---

## 1. Qué es este repo

Es la base de todo el proyecto. Contiene:

- **`client/`** → las dos aplicaciones de frontend (tienda y admin) en un monorepo.
- **`api/`** → el backend (servidor de la API).
- **`plan/`** → la documentación: especificación, diagramas de arquitectura/DER y el estado de avance.

La **especificación completa** (requerimientos, historias de usuario, base de datos) está en `plan/api/base.md`. Leela antes de empezar a programar.

---

## 2. Qué es un monorepo y Turborepo

Normalmente cada app es un proyecto separado con su propio `package.json`. Un **monorepo** junta varios proyectos relacionados en una sola carpeta y un solo repositorio git.

- `client/` es el monorepo de las apps de frontend.
- Usamos **Turborepo** (`turbo`) como orquestador de tareas: con un solo comando corre, compila o lintea **todas** las apps a la vez, reutilizando caché.

Pensalo así: en vez de ir app por app ejecutando `npm run dev`, turborepo lo hace por vos y en paralelo.

---

## 3. Stack del proyecto

| Parte | Tecnología |
|---|---|
| Backend | [NestJS](https://nestjs.com) (Node.js + TypeScript) |
| Frontend | [Vite](https://vite.dev) + [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org) |
| UI | [Chakra UI](https://chakra-ui.com) (v3) |
| Estado global (frontend) | [Zustand](https://zustand.docs.pmnd.rs) |
| Fetching de datos (frontend) | [SWR](https://swr.vercel.app) |
| Rutas (frontend) | [React Router](https://reactrouter.com) |
| Monorepo (frontend) | Turborepo |
| Calidad | ESLint, Prettier, Husky |

> El frontend se decidió **después** de que el template original trajera Next.js: se reemplazó por Vite + React porque son dos SPAs que consumen una API REST (más liviano y simple).

---

## 4. Estructura del repo

```text
desa-apps-prueba/
├── README.md            ← este archivo
├── package.json         ← scripts globales (lint, build) + husky
├── .husky/              ← hooks de git (se ejecutan en commit/push)
├── .gitignore
├── plan/                ← documentación del proyecto
│   └── api/
│       ├── base.md                          ← especificación completa
│       ├── diagramas_arquitectura_y_der_completo.md
│       └── avance.md                        ← estado actual del desarrollo
├── api/                 ← BACKEND (NestJS)
│   ├── src/
│   │   ├── config/      ← constantes globales
│   │   ├── controller/  ← capa de endpoints
│   │   ├── dto/         ← datos que recibe la API
│   │   ├── exception/   ← errores del dominio
│   │   ├── service/     ← lógica de negocio (servicios + orchestrators)
│   │   ├── model/       ← entidades (interfaces del DER)
│   │   ├── repository/  ← acceso a datos
│   │   └── module/      ← módulos de NestJS
│   └── test/
└── client/              ← FRONTEND (monorepo turborepo)
    ├── apps/
    │   ├── store/       ← app cliente (tienda) — puerto 5173
    │   └── admin/       ← app administrativa — puerto 5174
    └── packages/
        ├── eslint-config/      ← eslint compartido
        └── typescript-config/  ← tsconfigs compartidos
```

---

## 5. Backend: NestJS y su filosofía

### 5.1 Qué es NestJS

NestJS es un framework de Node.js para construir servidores (APIs) usando **TypeScript** y una estructura clara y ordenada. El backend de este proyecto **no** tiene páginas: es solo una API que las apps de frontend consumen por HTTP.

### 5.2 Las capas del backend

El código del backend está organizado en **capas**, cada una con una responsabilidad única. El flujo es siempre así:

```text
Controller  →  Service (u Orchestrator)  →  Repository  →  Base de datos
```

| Capa | Carpeta | Responsabilidad |
|---|---|---|
| **Controller** | `controller/` | Recibe las peticiones HTTP, valida la forma de los datos y delega. **Nunca** toca la base de datos. |
| **Service / Orchestrator** | `service/` | Tiene la **lógica de negocio**. Un service maneja una responsabilidad; un orchestrator coordina varios services. |
| **Repository** | `repository/` | Es el único que habla con la base de datos (hoy, en memoria). |
| **Model** | `model/` | Define las entidades (cómo se ve un Usuario, un Pedido, etc.). Son interfaces que copian el diagrama de base de datos (DER). |
| **DTO** | `dto/` | Define la forma de los datos que la API recibe del frontend. |
| **Exception** | `exception/` | Errores propios del negocio (ej: "Sucursal no disponible"). |
| **Config** | `config/` | Constantes globales (ej: transiciones de estado de un pedido). |

### 5.3 El patrón Orchestrator

**Regla de oro del proyecto:**

> **Los servicios primarios nunca se comunican entre sí. Si un caso de uso necesita varios servicios, un orchestrator los coordina.**

Ejemplo: *confirmar un pedido* necesita saber si el cliente existe, si la dirección es suya, qué hay en el carrito, qué productos están disponibles y qué sucursal está abierta. Eso no lo hace un solo servicio: lo hace el **`CheckoutOrchestrator`**, que le pide a cada servicio lo suyo y combina los resultados.

Un caso de uso **simple** (ej: crear una categoría) va directo: `Controller → Service → Repository`.

### 5.4 Los módulos

NestJS se organiza en **módulos** (`@Module`). Un módulo agrupa lo relacionado a un **dominio**:

- `CategoryModule`, `ProductModule`, `CartModule`, `OrderModule`, `UserModule`... **un módulo por dominio**.
- Los módulos de dominio **exportan** sus servicios para que otros los usen.
- Los orchestrators viven en módulos que **importan** los dominios que coordinan (ej: `CatalogModule` importa categorías + productos).

Todos los módulos se registran en `AppModule`.

---

## 6. Frontend: Vite + React + Chakra UI

Son dos apps React en un monorepo:

- **`apps/store`** (cliente): catálogo, carrito, checkout, seguimiento de pedidos.
- **`apps/admin`** (administración): ABMs (productos, categorías, sucursales...), pedidos, reportes.

Stack de cada app:

- **Chakra UI** → componentes visuales (botones, tablas, modales).
- **React Router** → navegación entre páginas.
- **SWR** → traer datos de la API con caché automática.
- **Zustand** → estado global (ej: el carrito, el usuario logueado).

Cada app tiene esta estructura base:

```text
src/
├── components/  ← componentes reutilizables
├── pages/       ← las "pantallas" (Login, Catálogo, Carrito...)
├── hooks/       ← lógica reutilizable con hooks
├── hoc/         ← componentes envoltorio (protección de rutas, etc.)
├── types/       ← tipos de TypeScript del dominio
└── utils/       ← funciones auxiliares
```

---

## 7. Cómo levantar el proyecto

Requisitos: **Node.js ≥ 18** (se recomienda 20).

```sh
# 1) Instalar dependencias del backend
cd api
npm install

# 2) Instalar dependencias del frontend (monorepo)
cd ../client
npm install

# 3) Levantar la API (puerto 3000)
cd ../api
npm run start:dev

# 4) Levantar las apps de frontend (en otra terminal)
cd ../client
npm run dev          # corre store (5173) y admin (5174) a la vez
# o por separado:
npm run dev -- --filter=@repo/store   # solo tienda
npm run dev -- --filter=@repo/admin   # solo admin
```

Abrí:
- Tienda → http://localhost:5173
- Admin → http://localhost:5174
- API → http://localhost:3000

> **Nota:** la base de datos hoy es **en memoria** (los repositorios guardan datos en RAM). Cuando reiniciás la API, los datos se pierden. La integración con una base real es un próximo paso.

---

## 8. Comandos útiles

### Backend (`api/`)

```sh
npm run start:dev    # levanta con auto-reload
npm run build        # compila
npm run lint         # eslint (con --fix)
npm run test         # jest (unit)
npm run test:e2e     # pruebas de integración
```

### Frontend (`client/`)

```sh
npm run dev          # corre todas las apps (turbo)
npm run build        # compila todas las apps
npm run lint         # eslint de todas las apps
npm run check-types  # verificación de tipos (tsc)
npm run format       # formatea todo con prettier
```

### Raíz del repo

```sh
npm run lint         # lint de api + client juntos
npm run build        # build de api + client juntos
```

---

## 9. Calidad: ESLint, Prettier y Husky

Configuramos calidad de código de forma **global** para que todos los devs sigan el mismo estilo:

- **ESLint** → reglas de código (TypeScript, React, buenas prácticas).
- **Prettier** → formato automático (comillas, punto y coma, indentación).
- **Husky** → "ganchos" de git que corren automáticamente:

  - **Al hacer `git commit`** → corre `npm run lint`. Si hay errores, no te deja commitear.
  - **Al hacer `git push`** → corre `npm run build && npm run lint`.

> Si husky te frena el commit, es porque hay errores de lint. Corré `npm run lint` (con `--fix`) y volvé a intentar.

---

## 10. Dónde está la documentación

Todo lo importante vive en **`plan/api/`**:

| Archivo | Qué es |
|---|---|
| `base.md` | La especificación completa: requerimientos (RF), historias de usuario (HU), base de datos (DER), arquitectura y etapas. |
| `diagramas_arquitectura_y_der_completo.md` | Diagramas de la arquitectura (uno por orchestrator) y el modelo de datos. |
| `avance.md` | Estado actual del desarrollo: qué está hecho y qué falta. |

Además, dentro de `api/.claude/skills/` hay reglas conceptuales del proyecto (arquitectura, patrones de dominio, tests, calidad de código). `api/CLAUDE.md` y `api/AGENTS.md` explican cómo usar esas reglas.

---

## 11. Estado actual y próximos pasos

**Lo que está listo:**

- ✅ Estructura completa del backend (capas, módulos, modelos, DTOs, repos, endpoints).
- ✅ Las dos apps de frontend con su base (Vite + React + Chakra + SWR + Zustand + Router).
- ✅ ESLint, Prettier y Husky globales.
- ✅ Todo compila, lintea, testea y levanta.

**Lo que falta (por hacer):**

- ⛔ La **lógica de negocio**: los servicios y orchestrators son "stubs" (no hacen nada todavía). Ese es el trabajo principal del equipo.
- ⛔ Base de datos real (hoy es en memoria) y seed del administrador inicial.
- ⛔ Autenticación real (JWT, permisos).
- ⛔ Las páginas reales de las apps de frontend.
- ⛔ Tests de negocio.

Para el detalle de qué falta exactamente, mirá `plan/api/avance.md`.
