import { useLocation } from "react-router-dom"
import { desktopNavItems } from "../utils/navigation"
import type { NavItem } from "../types"

interface UseStoreNavigationReturn {
  navItems: NavItem[]
  isActive: (path: string) => boolean
}

export const useStoreNavigation = (): UseStoreNavigationReturn => {
  const { pathname } = useLocation()

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  return { navItems: desktopNavItems, isActive }
}
