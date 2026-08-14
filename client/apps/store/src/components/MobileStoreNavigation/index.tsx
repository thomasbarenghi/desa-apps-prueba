import { Box, HStack } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"
import { useCartCount } from "../CartButton/hooks/useCartCount"
import { MobileNavItem } from "./MobileNavItem"
import { mobileNavItems } from "./utils/navigation"
import type { MobileStoreNavigationProps } from "./types"

export const MobileStoreNavigation = ({ clientId }: MobileStoreNavigationProps) => {
  const { pathname } = useLocation()
  const { count } = useCartCount({ clientId })

  return (
    <Box
      as="nav"
      bg="bg.panel"
      borderTop="1px"
      borderColor="border.subtle"
      position="fixed"
      bottom="0"
      insetX="0"
      zIndex="docked"
      display={{ base: "block", md: "none" }}
    >
      <HStack gap="0">
        {mobileNavItems.map((item) => (
          <MobileNavItem
            key={item.id}
            item={item}
            isActive={pathname === item.path}
            count={item.id === "cart" ? count : undefined}
          />
        ))}
      </HStack>
    </Box>
  )
}
