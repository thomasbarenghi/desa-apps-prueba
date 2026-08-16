import { Badge, Box, Link as ChakraLink, Text } from "@chakra-ui/react"
import House from "@gravity-ui/icons/House"
import LayoutCells from "@gravity-ui/icons/LayoutCells"
import ListUl from "@gravity-ui/icons/ListUl"
import Person from "@gravity-ui/icons/Person"
import ShoppingCart from "@gravity-ui/icons/ShoppingCart"
import { NavLink } from "react-router-dom"
import type { ComponentType, SVGProps } from "react"
import type { MobileNavItem as MobileNavItemType } from "./types"

const ICON_BY_ID: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  home: House,
  catalog: LayoutCells,
  cart: ShoppingCart,
  orders: ListUl,
  profile: Person,
}

interface MobileNavItemProps {
  item: MobileNavItemType
  isActive: boolean
  count?: number
}

export const MobileNavItem = ({ item, isActive, count }: MobileNavItemProps) => {
  const IconComponent = ICON_BY_ID[item.id] ?? House
  const showBadge = item.id === "cart" && count !== undefined && count > 0

  return (
    <ChakraLink asChild>
      <NavLink to={item.path} aria-label={item.label}>
        <Box
          position="relative"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="0.5"
          paddingX="3.5"
          paddingY="2"
          borderRadius="full"
          bg={isActive ? "brand.500" : "transparent"}
          color={isActive ? "white" : "fg.muted"}
          transition="background-color 150ms, color 150ms"
        >
          <IconComponent width={20} height={20} />
          <Text fontSize="2xs" fontWeight={isActive ? "semibold" : "medium"} lineHeight="1">
            {item.label}
          </Text>
          {showBadge ? (
            <Badge
              position="absolute"
              top="-4px"
              right="2px"
              minWidth="4"
              height="4"
              paddingX="1"
              borderRadius="full"
              fontSize="2xs"
              bg={isActive ? "white" : "brand.500"}
              color={isActive ? "brand.600" : "white"}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {count}
            </Badge>
          ) : null}
        </Box>
      </NavLink>
    </ChakraLink>
  )
}
