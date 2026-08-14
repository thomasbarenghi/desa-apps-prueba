import { Box, Link as ChakraLink, HStack } from "@chakra-ui/react"
import Person from "@gravity-ui/icons/Person"
import { NavLink } from "react-router-dom"
import { CartButton } from "../CartButton"
import { ColorModeButton } from "../ColorModeProvider/ColorModeButton"
import { useCartCount } from "../CartButton/hooks/useCartCount"
import type { StoreHeaderProps } from "./types"

interface HeaderActionsProps extends Pick<StoreHeaderProps, "clientId"> {
  onOpenCart: () => void
}

export const HeaderActions = ({ clientId, onOpenCart }: HeaderActionsProps) => {
  const { count } = useCartCount({ clientId })

  return (
    <HStack gap="1">
      <ColorModeButton />
      <Box display={{ base: "none", md: "flex" }}>
        <CartButton count={count} onClick={onOpenCart} />
      </Box>
      <ChakraLink
        asChild
        display={{ base: "none", md: "flex" }}
        aria-label="Perfil"
        padding="2"
        borderRadius="full"
        color="fg.muted"
        _hover={{ color: "fg" }}
      >
        <NavLink to="/perfil">
          <Person width={20} height={20} />
        </NavLink>
      </ChakraLink>
    </HStack>
  )
}
