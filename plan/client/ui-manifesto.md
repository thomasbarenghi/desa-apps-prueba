# UI Manifesto — DESA Apps

Este documento define **cómo se ve y se siente** DESA Apps (store + admin). Es la fuente de verdad visual para cualquier agente que escriba UI. Leer junto con `client/.claude/skills/interface-design`, `better-ui`, `impeccable` y `frontend-components`.

---

## Dirección visual: **"Calor"**

Una app de delivery que se siente **cálida, vibrante y cercana**, como la comida recién hecha. No fría, no corporativa, no genérica.

- **Temperatura:** cálida. Todo (fondos, bordes, textos, acentos) se inclina al naranja y a los neutros cálidos. Nada de grises azulados fríos.
- **Sensación:** apetito, urgencia, calidez, cercanía. "Pedí y llega caliente".
- **Mobile = app, Desktop = web:** en mobile se comporta como una app nativa (bottom bar de píldoras, gestos, densidad compacta); en desktop como una web cuidada (nav superior, más aire, jerarquía clara).

## Paleta

Definida en `apps/*/src/theme.ts` como tokens semánticos de Chakra.

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `bg` | `#FFFFFF` | `#17120C` | Fondo de página (siempre `#fff` en claro) |
| `bg.panel` | `#FFFFFF` | `#201912` | Tarjetas, header, bottom bar |
| `bg.muted` | `#FFF1E5` | `#2B2218` | Fondo suave de cards/inputs destacados |
| `bg.subtle` | `#FFF9F4` | `#1E1810` | Fondo secundario / secciones |
| `fg` | `#1C1917` | `#F7EFE7` | Texto principal |
| `fg.muted` | `#6B7280` | `#A8A29E` | Texto secundario |
| `border.subtle` | `#FBE4D2` | `#3A2F24` | Bordes finos |
| `border.muted` | `#F6D6BE` | `#45372A` | Bordes de separación |
| `brand.500` | `#EA580C` | `#EA580C` | Elementos destacados, item activo |
| `brand.600` | `#C2410C` | `#C2410C` | Botón primario |
| `brand.700` | `#9A3412` | `#9A3412` | Hover / estados fuertes |
| `accent.500` | `#F59E0B` | `#F59E0B` | Indicadores secundarios |

**Reglas de color:**
- **Nunca** colores duros por defecto en el markup: siempre tokens semánticos (`bg`, `fg`, `border.subtle`, `brand.*`).
- El naranja `brand` es el único acento. Un solo color, usado con intención.
- En claro el fondo es `#fff` siempre (requisito del producto).
- Estados: combinar color + ícono + texto (nunca color solo).

## Tipografía

- **Fuente global:** Outfit (Google Fonts), cargada en `index.html` y configurada en `theme.ts` (`fonts.heading` y `fonts.body`).
- **Jerarquía por peso y color, no solo por tamaño.** Tres niveles con la misma base:
  - `value` — 600 / `fg`
  - `label` — 500 / `fg.muted`
  - `meta` — 400 / `fg.subtle`
- Escala sugerida (ratio ~1.25): caption 12 · body 14/16 · h4 18 · h3 22 · h2 28 · h1 32 · display 44.
- Headings: `fontWeight="bold"` (700). Body: 400.
- `tabular-nums` en números dinámicos (precios, contadores).

## Geometría

- **Bordes:** píldoras (`borderRadius="full"`) para botones, chips y nav items activos. Radios generosos (`xl`) en tarjetas.
- **Concentricidad:** `outerRadius = innerRadius + padding`. Nunca el mismo radio en padre e hijo anidados.
- **Espaciado:** base 4px, múltiplos. Simétrico salvo que el contenido lo exija.
- **Profundidad:** elección única — **bordes sutiles + sombras suaves en claro**; en oscuro solo bordes (`rgba(255,255,255,0.06–0.12)`), las sombras no leen en dark.

## Componentes clave (patrones)

### Bottom bar mobile (`MobileStoreNavigation`)
- Solo visible en mobile (`display={{ base: "block", md: "none" }}`), fija abajo.
- Item activo = **píldora `brand.500` con texto blanco**. Inactivo = texto `fg.muted`.
- Es el navegador principal en mobile. Los items de cuenta (Perfil, Editar, Direcciones) viven en la página Perfil, no duplicados en la bottom bar.

### Header (`StoreHeader`)
- Sticky, `bg.panel`, borde inferior `border.subtle`.
- Desktop: logo + nav con píldora activa naranja + acciones (toggle dark, carrito, perfil).
- Mobile: solo logo + toggle dark. El carrito vive en la bottom bar y en el drawer.

### Drawers
- Carrito y menús: `Drawer placement` en `Portal`, full-height (`100dvh`), `zIndex` por encima del header.
- El drawer de carrito: header "Mi carrito" + X, body con estado vacío o items, footer con botón primario 100% ancho.

### Perfil (`/perfil`)
- Tipo app de delivery: cabecera (avatar + nombre + email) + accesos de cuenta en tarjetas (Editar perfil, Direcciones, Sucursales).
- Formulario en página separada `/perfil/editar` (T-16). No tirar el form en el perfil.

## Micro-interacciones

- `transition` explícito en propiedades concretas (`background-color`, `color`, `transform`), nunca `transition: all`.
- Press: `scale(0.96)` en `:active` para botones.
- Hover: cambio de color suave (~150ms).
- Sin animaciones en interacciones de alta frecuencia (nav).

## Responsive

- **Mobile-first.** Diseñar a 390px, luego desktop.
- Mobile = app (bottom bar, densidad compacta, píldoras). Desktop = web (nav superior, container `maxW="1200px"`, más aire).
- Bottom bar y drawers solo en mobile.

## Anti-patrones

- ❌ Fondos grises azulados fríos.
- ❌ Múltiples acentos de color.
- ❌ Bordes duros como única profundidad (usar sombras en claro).
- ❌ Radios iguales en contenedores anidados.
- ❌ Números que se mueven al cambiar (usar `tabular-nums`).
- ❌ `transition: all`, `will-change: all`.
- ❌ Colores hex sueltos en el markup — siempre tokens.

## Cómo aplicar

1. Siempre usar componentes Chakra (nunca divs custom) y tokens semánticos.
2. Botones primarios: `bg="brand.600" color="white"`.
3. Nav activo: píldora `brand.500` / texto blanco.
4. Cards: `bg="bg.panel"` + `borderRadius="xl"` + borde `border.subtle` (o sombra en claro).
5. Verificar en mobile y desktop antes de dar por terminado.
