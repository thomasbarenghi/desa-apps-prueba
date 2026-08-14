import { Link as ChakraLink, VStack, Text, Box } from "@chakra-ui/react"
import ArrowChevronRight from "@gravity-ui/icons/ArrowChevronRight"
import { NavLink } from "react-router-dom"
import type { ProfileNavItem } from "./types"

const ACCOUNT_ITEMS: ProfileNavItem[] = [
  { id: "edit", label: "Editar perfil", path: "/perfil/editar" },
  { id: "addresses", label: "Mis direcciones", path: "/perfil/direcciones" },
  { id: "branches", label: "Sucursales", path: "/sucursales" },
]

export const ProfileNav = () => {
  return (
    <VStack align="stretch" gap="1" as="nav" aria-label="Opciones de cuenta">
      {ACCOUNT_ITEMS.map((item) => (
        <ChakraLink
          asChild
          key={item.id}
          bg="bg.panel"
          borderRadius="xl"
          paddingY="3"
        >
          <NavLink to={item.path}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Text fontWeight="medium">{item.label}</Text>
              <ArrowChevronRight width={18} height={18} />
            </Box>
          </NavLink>
        </ChakraLink>
      ))}
    </VStack>
  )
}
