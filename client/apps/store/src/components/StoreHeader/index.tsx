import { Box, Container, Flex, Link as ChakraLink } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { CartDrawer } from "../CartDrawer"
import { Logo } from "../Logo"
import { DesktopNav } from "./DesktopNav"
import { HeaderActions } from "./HeaderActions"
import { useStoreNavigation } from "./hooks/useStoreNavigation"

export const StoreHeader = () => {
  const { navItems, isActive } = useStoreNavigation()
  const cart = useDisclosure()

  return (
    <Box as="header" bg="bg.panel" borderBottom="1px" borderColor="border.subtle">
      <Container maxW="1200px">
        <Flex h="16" align="center" justify="space-between" gap="4">
          <ChakraLink asChild>
            <NavLink to="/" aria-label="Ir al inicio">
              <Logo height="40px" />
            </NavLink>
          </ChakraLink>
          <DesktopNav items={navItems} isActive={isActive} />
          <HeaderActions onOpenCart={cart.onOpen} />
        </Flex>
      </Container>
      <CartDrawer open={cart.open} onClose={cart.onClose} />
    </Box>
  )
}
