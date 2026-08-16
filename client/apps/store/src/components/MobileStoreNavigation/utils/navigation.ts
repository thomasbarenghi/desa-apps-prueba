import { routes } from "../../../routes"
import type { MobileNavItem } from "../types"

export const mobileNavItems: MobileNavItem[] = [
  { id: "home", label: "Inicio", path: routes.home },
  { id: "catalog", label: "Catálogo", path: routes.catalog },
  { id: "cart", label: "Carrito", path: routes.cart },
  { id: "orders", label: "Pedidos", path: routes.orders },
  { id: "profile", label: "Perfil", path: routes.profile },
]
