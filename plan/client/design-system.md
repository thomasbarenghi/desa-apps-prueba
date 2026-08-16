# Design System — DESA Apps (registro del sistema implementado)

> Complementa a `ui-manifesto.md`. Mientras el manifesto dice **cómo pensar**, este documento registra **qué ya está decidido y construido** (inventario, firma visual, medidas y porqués). Un agente que arranque de cero debe leer ambos: el manifesto para los principios y este archivo para no reinventar ni romper lo que ya existe.

Última actualización: tras el rediseño integral de la app store (dirección "Calor").

---

## 1. Estado actual (inventario)

### 1.1 Rutas de la tienda (`apps/store/src/App.tsx`)

| Ruta | Página | Estado |
|---|---|---|
| `/` | HomePage (storefront) | ✅ implementado |
| `/catalogo` | CatalogPage (búsqueda + filtro por categoría via `?cat=<id>`) | ✅ |
| `/productos/:productId` | ProductDetailPage (configurador) | ✅ |
| `/carrito` | CartPage | ✅ |
| `/checkout` | CheckoutPage (carga de dirección + confirmación) | ✅ |
| `/sucursales` | SucursalesPage (lista, datos mock) | ✅ |
| `/pedidos` | OrdersPage (timeline + historial) | ✅ |
| `/pedidos/:orderId` | OrderDetailPage (detalle con mapa de seguimiento para pedidos activos) | ✅ |
| `/perfil` | ProfilePage | ✅ |
| `/perfil/editar` | EditProfilePage | ✅ |
| `/perfil/direcciones` | AddressesPage (CRUD de direcciones guardadas) | ✅ |
| `/login` | LoginPage | ✅ |
| `/registro` | RegisterPage | ✅ |
| `/recuperar-contrasena` | ForgotPasswordPage | ✅ |
| `/restablecer-contrasena/:token` | ResetPasswordPage | ✅ |

Las rutas de la tienda están protegidas por el HOC `RequireAuth` (salvo las de auth). Por defecto exigen sesión; agregar `?forceAuth=true` a la URL desactiva la protección (el flag se persiste y se forwardea entre la navegación), y `?forceAuth=false` la reactiva.

### 1.2 Componentes (`apps/store/src/components/`)

`AddressPickerModal` (+ `AddressForm`), `AuthSuccess`, `CartButton`, `CartDrawer`, `CartLineCard`, `CategoryChip`, `ColorModeProvider` (+ `ColorModeButton`), `EmptyState`, `LocationButton`, `Logo`, `MobileStoreNavigation` (+ `MobileNavItem`), `OrderStatusBadge`, `OrderTimeline`, `PasswordInput`, `ProductCard`, `QuantityStepper`, `SectionHeader`, `StoreHeader` (+ `DesktopNav`, `HeaderActions`).

### 1.3 Hooks, stores, utils, types

- **hooks:** `useCatalog`, `useProduct`, `useProfile`, `useOrder` (patrón SWR + fallback mock).
- **hoc:** `RequireAuth` (protege las rutas de la tienda; permite bypass con `?forceAuth=true`).
- **layouts:** `StoreLayout`, `AuthLayout` (shell de las pantallas de auth: card centrada en desktop, full-screen en mobile).
- **stores:** `cartStore` (líneas de carrito con opciones/notas, `addLine`/`removeLine`/`setQuantity`/`clear`, y helpers `lineUnitPrice`/`lineTotal`/`cartItemCount`/`cartTotal`), `addressStore` (direcciones guardadas + `selectedAddressId` con persistencia en `localStorage`, `selectAddress`/`addAddress`/`updateAddress`/`removeAddress`), `authStore` (sesión `user` + `bypassAuth` persistidos, `login`/`register`/`logout`/`setBypassAuth` mock).
- **utils:** `catalog.ts` (mock de categorías/productos + `formatPrice`), `orders.ts` (estados + mock + `getOrderById`), `sucursales.ts` (mock), `addresses.ts` (mock de direcciones), `geoapify.ts` (`buildStaticMapUrl` para el mapa estático de seguimiento), `user.ts` (`MOCK_USER`).
- **types:** `catalog.ts`, `order.ts`, `user.ts`, `address.ts`, `auth.ts`.

### 1.4 Datos mock (hasta que la API sea real)

- 5 categorías, 13 productos con fotos de Unsplash.
- 2 direcciones guardadas (mock) en `utils/addresses.ts`, semilladas en `addressStore`.
- `useProfile` devuelve `MOCK_USER` ("Juan Pérez") cuando no hay `userId`.
- `useCatalog`/`useProduct` intentan el endpoint `/api/...` y caen al mock si falla o no hay proxy (mismo patrón que `useProfile`).
- Pedidos y sucursales: arrays mock en `utils/orders.ts` y `utils/sucursales.ts`.
- 3 pedidos mock con detalle: 1 activo (`ON_THE_WAY`, con rider y coordenadas para el mapa), 1 entregado y 1 cancelado (con motivo).
- Auth mock: `authStore` con `login`/`register` que simulan latencia (600ms) y devuelven `MOCK_USER` (o un usuario construido en `register`); la sesión persiste en `localStorage`.

---

## 2. Firma visual (los movimientos compositivos que definen la identidad)

### 2.1 Hero editorial con "ember glow"

La pantalla de inicio no es un dashboard: es una **composición editorial** con un protagonista (el headline + el CTA).

- Superficie: `borderRadius="3xl"`, `bg="bg.subtle"`, borde `border.subtle`, `overflow="hidden"`.
- Glow: blobs `brand.500` y `accent.500` con `filter="blur(90px)"`, `opacity="0.14"`, radios `full`, posicionados fuera del contenedor (top/right y bottom/left). **Solo tokens, nunca hex.**
- Grid `1.15fr / 1fr` en desktop, una columna en mobile. Padding `8` → `14`.
- Tipo: eyebrow (ícono + texto `brand.600`), `H1` display `4xl → 6xl`, `lineHeight="1.02"`, `letterSpacing="-0.02em"`, `textWrap="balance"`. Un `H2` secundario en `brand.600` para la frase corta.
- Foto (desktop only): card `borderRadius="2xl"`, `aspectRatio="4 / 3"`, `boxShadow="xl"`, `transform="rotate(2deg)"`; una **píldora flotante** solapada (`bottom="-12px"`) con dato contextual ("Entrega ~35 min").

### 2.2 Card de producto image-led

La foto es la protagonista; el precio y la acción "+" compiten poco.

- Card `borderRadius="2xl"`, borde `border.subtle`, `overflow="hidden"`.
- Imagen `aspectRatio="4 / 3"` (no thumbnail chico). Nombre `semibold` + descripción `fg.muted` con `lineClamp={1}`.
- Footer `HStack justify="space-between"`: precio `semibold` + `tabular-nums` a la izquierda; `IconButton` píldora `bg="brand.600"` con `Plus` (16) a la derecha.
- Hover: `translateY(-2px)` + `boxShadow="md"` (150ms, `cubic-bezier(0.2,0,0,1)`).

### 2.3 Dock flotante mobile

Navegación como app nativa, **no una barra a todo el ancho**.

- Wrapper `fixed`, `bottom="4"`, centrado, `pointerEvents="none"`; el dock interno `pointerEvents="auto"`.
- Dock: `bg.panel`, `borderRadius="full"`, `padding="1"`, borde `border.subtle`, `boxShadow="lg"`.
- Item activo = píldora `brand.500` texto blanco; inactivo = `fg.muted`. Ícono 20 + label `2xs`.
- Carrito con badge (top/right, `brand.500`, blanco cuando el ítem está activo).

### 2.4 Configurador de producto

- Detalle en `Grid 1fr/1fr` (imagen `sticky top="24"` en desktop, `aspectRatio="1 / 1"`).
- Grupos de opciones: botones `ghost` full-width, `justify-between`, `borderRadius="xl"`, `px 4 / py 3`, borde `1.5px`. Indicador 18px (círculo para single, cuadrado con `Check` para multiple). Precio delta en `brand.600` o "Sin cargo".
- Resumen del ítem en `bg.subtle` `2xl` `padding 5`: cantidad + total (grande) + CTA `brand.600` píldora full-width.

### 2.5 Timeline de pedido

- Dots 14px + línea 2px (`brand.500` completado, `border.subtle` pendiente, `brand.600` actual). Labels `2xs` `whiteSpace="nowrap"` con pasos cortos ("Preparando" en vez de "En preparación") para que no se corten en pantallas angostas.
- Badge de estado: `OrderStatusBadge` = `Badge` `variant="subtle"` + punto `currentColor` + texto (color + ícono + texto, nunca color solo).

### 2.6 Selector de dirección (`AddressPickerModal`)

Aparece al cargar la app si no hay una dirección seleccionada; se reabre desde el chip del header (`LocationButton`).

- **Desktop = modal centrado** (`DialogRoot` `placement="center"`), **mobile = bottom sheet** (`DrawerRoot` `placement="bottom"`). La variante se decide con `useMediaQuery(["(min-width: 48em)"])`.
- **Chip del header (`LocationButton`)**: píldora `ghost` de una línea (`GeoPin` `brand.600` + calle `medium` + `ChevronDown`), `height="9"`. Visible en desktop siempre; en mobile solo en Inicio, Catálogo y Carrito.
- Encabezado: ícono `GeoPin` en círculo `brand.600` sobre `bg.muted` (44px), título `xl` bold, subtítulo `fg.muted`.
- Lista de direcciones: `Button` `variant="outline"` full-width (`height="auto"`, `borderColor="border.subtle"`, `borderRadius="xl"`), con label `semibold` + calle `fg.muted` + localidad `fg.subtle` + `ChevronRight`. Tap = selecciona y cierra.
- "Agregar nueva dirección": `variant="ghost"` `brand.600` con `Plus`; cambia a un formulario (`Field.Root` + `Input` `bg="bg.subtle"` `borderRadius="xl"`). Si hay guardadas, el formulario tiene "Volver".
- Bottom sheet: grabber (`w=10` `h=1` `border.emphasized`), `borderTopRadius="3xl"` y `paddingBottom` con `safe-area-inset-bottom`.
- La selección persiste en `addressStore` (`localStorage`); no vuelve a preguntar mientras exista una seleccionada. En checkout se precarga la dirección seleccionada.

### 2.7 Detalle de pedido (`OrderDetailPage`)

- **Activo** (`PENDING`…`ON_THE_WAY`): timeline (`OrderTimeline`) + **mapa estático de seguimiento** (Geoapify `buildStaticMapUrl`) con 3 markers — tienda (`info`, texto "T"), dirección del cliente (`success`, texto "C") y rider (`brand`, ícono `person-biking`) — y una leyenda con punto de color + título + subtítulo.
- **Cancelado**: card con `CircleXmarkFill` `danger` + motivo (`cancelReason`).
- **Entregado**: card con `CircleCheckFill` `success` + fecha (`deliveredAt`).
- Items (cantidad × nombre + subtotal) y total con `tabular-nums`. Atribución de mapa: "© OpenStreetMap · Geoapify".
- Mapa = `Image` responsive (`width="100%"`) sobre card `bg.panel` `2xl` `overflow="hidden"`. Solo en pedidos activos.

### 2.8 Autenticación (`AuthLayout` + páginas de auth)

- **Desktop**: fondo `bg.muted`, card centrada `bg.panel` con `border.subtle` y `3xl` + `md` shadow, `maxW="sm"`, logo `48px` arriba.
- **Mobile**: full-screen (sin card ni borde) sobre `bg`, logo arriba, campos `size="lg"` full-width y `paddingBottom` con `safe-area-inset-bottom` (look de app nativa).
- Formularios: `Field.Root` + `Input` `bg="bg.subtle"` `xl`. Contraseñas con `PasswordInput` (`InputGroup` + `IconButton` ghost con `Eye`/`EyeClosed`).
- Éxito de recuperar/restablecer: `AuthSuccess` (ícono `CircleCheckFill` `success` + título + descripción + CTA full-width).
- CTA primario: `Button` `bg="brand.600"` `color="white"` `full` con `loading`/`disabled` mientras envía. Links de auth: `ChakraLink` `brand.600` `medium`.
- `RequireAuth` protege las rutas de tienda; redirige a `/login` con `state.from` para volver al destino tras loguearse. Cierre de sesión en `ProfilePage` ("Cerrar sesión", outline `danger`).

---

## 3. Medidas y tokens rápidos (cheat-sheet)

| Decisión | Valor |
|---|---|
| Ancho máximo de contenido | `Container maxW="1200px"` |
| Header height | `h="16"` (64px) |
| Logo | `height="40px"` |
| Radio — píldoras/botones/chips/nav activo | `full` |
| Radio — inputs / opciones / cards chicas | `xl` |
| Radio — cards | `2xl` |
| Radio — hero / banner | `3xl` |
| Glow ember | `blur(80–90px)`, `opacity(0.12–0.35)` |
| Elevación (claro) | borde `border.subtle` + `boxShadow` suave (`sm`/`md`/`lg`) |
| Elevación (oscuro) | solo bordes `border.*`, sin sombras |
| Botón primario | `bg="brand.600" color="white"` píldora, hover `brand.700` |
| Nav activo | píldora `brand.500` / texto blanco |
| Espaciado base | 4px, múltiplos |
| Grilla productos | `SimpleGrid` base 2 / md 3 / lg 4, gap `3` → `5` |
| Escala tipo | 2xs (nav/timeline) · xs (tags) · sm (secundario) · md/lg (título de card) · xl (valores) · 2xl–4xl (títulos) · 6xl (hero) |

Paleta completa: ver `ui-manifesto.md` §4 o `apps/*/src/theme.ts`.

---

## 4. Decisiones tomadas y su porqué

| Decisión | Porqué |
|---|---|
| Footer solo desktop | En mobile el dock + contenido alcanzan; el footer es ruido y quita protagonismo. |
| Header mobile = logo + selector de dirección (solo Inicio y Catálogo) | Menos UI. Carrito va en el dock; el toggle dark va en Perfil. El selector de dirección es una acción contextual de descubrimiento (solo en las pantallas donde se navega el catálogo). |
| Toggle dark en Perfil (mobile) | No es una acción frecuente; disclosure progresivo. |
| Dark = negro + grises (no marrón) | El marrón ensucia en oscuro; el "calor" lo aporta el naranja sobre negro. |
| Chevrons simples (`Chevron*`) | Las flechas dobles (`ArrowChevron*`) se ven raras. |
| Dirección cargada en checkout | Es una verdad de producto: la entrega es a la dirección del cliente, no hay dirección por defecto ni "campus". El selector de dirección al cargar (modal/bottom sheet) persiste la dirección elegida y precarga el checkout. |
| Mock de respuestas | La API aún es stub; `SWR + fallback` mantiene el contrato y permite reemplazar por datos reales sin tocar la UI. |
| Fotografía Unsplash art-directed | La imagen forma parte de la composición, no es un thumbnail decorativo. |
| Menos cards | Estructura con tipografía, espacio y fondo antes que contenedores. |

---

## 5. Cómo extender sin romper

1. Antes de tocar una pantalla, leer `ui-manifesto.md` + este archivo.
2. Reusar los componentes existentes (`ProductCard`, `CategoryChip`, `QuantityStepper`, `EmptyState`, `SectionHeader`, `OrderStatusBadge`, `CartLineCard`) en lugar de crear variantes.
3. Respetar medidas y tokens de la tabla §3; no introducir nuevos acentos ni hex sueltos.
4. Nuevas pantallas: definir el **protagonista** primero, luego jerarquía primario→secundario, luego identidad.
5. Mock nuevo = patrón `SWR + fallback` (como `useCatalog`/`useProduct`).
6. Verificar en 390px (mobile) y 1200px (desktop); recomponer, no encoger.
7. Si una decisión nueva cambia el sistema (color, patrón, navegación), actualizar **este archivo y el manifesto** en el mismo cambio.
