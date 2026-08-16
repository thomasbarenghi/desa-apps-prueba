import { Box, HStack } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"
import { routes } from "../../routes"
import { useCartCount } from "../CartButton/hooks/useCartCount"
import { MobileNavItem } from "./MobileNavItem"
import { mobileNavItems } from "./utils/navigation"

export const MobileStoreNavigation = () => {
  const { pathname } = useLocation()
  const { count } = useCartCount()

  const isActive = (path: string) => {
    if (path === routes.home) return pathname === routes.home
    return pathname.startsWith(path)
  }

  return (
    <Box
      position="fixed"
      bottom="4"
      left="0"
      right="0"
      display={{ base: "flex", md: "none" }}
      justifyContent="center"
      paddingX="4"
      zIndex="docked"
      pointerEvents="none"
    >
      <HStack
        as="nav"
        gap="0"
        bg="bg.panel"
        borderRadius="full"
        padding="1"
        border="1px solid"
        borderColor="border.subtle"
        boxShadow="lg"
        pointerEvents="auto"
        aria-label="Navegación principal"
      >
        {mobileNavItems.map((item) => (
          <MobileNavItem
            key={item.id}
            item={item}
            isActive={isActive(item.path)}
            count={item.id === "cart" ? count : undefined}
          />
        ))}
      </HStack>
    </Box>
  )
}
