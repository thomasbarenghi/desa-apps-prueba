import { Box, Container, Flex, Link as ChakraLink } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { CartDrawer } from "../CartDrawer"
import { Logo } from "../Logo"
import { DesktopNav } from "./DesktopNav"
import { HeaderActions } from "./HeaderActions"
import { useStoreNavigation } from "./hooks/useStoreNavigation"
import type { StoreHeaderProps } from "./types"

export const StoreHeader = ({ clientId }: StoreHeaderProps) => {
  const { navItems, isActive } = useStoreNavigation()
  const cart = useDisclosure()

  return (
    <Box as="header" bg="bg.panel" borderBottom="1px" borderColor="border.subtle" position="sticky" top="0" zIndex="sticky">
      <Container maxW="1200px">
        <Flex h="20" align="center" justify="space-between" gap="4">
          <Flex align="center" gap="8">
            <ChakraLink asChild>
              <NavLink to="/" aria-label="Ir al inicio">
                <Logo height={"60px"} />
              </NavLink>
            </ChakraLink>
            <DesktopNav items={navItems} isActive={isActive} />
          </Flex>
          <HeaderActions clientId={clientId} onOpenCart={cart.onOpen} />
        </Flex>
      </Container>
      <CartDrawer open={cart.open} onClose={cart.onClose} clientId={clientId} />
    </Box>
  )
}
