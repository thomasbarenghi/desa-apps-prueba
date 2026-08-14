import { Link as ChakraLink, VStack, Text } from "@chakra-ui/react"
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

  return (
    <ChakraLink asChild flex="1">
      <NavLink to={item.path}>
        <VStack
          gap="0.5"
          paddingY="1.5"
          marginY="2"
          align="center"
          bg={isActive ? "brand.500" : "transparent"}
          color={isActive ? "white" : "fg.muted"}
          borderRadius="full"
          mx="2"
        >
          <IconComponent width={20} height={20} />
          <Text fontSize="xs" fontWeight={isActive ? "semibold" : "medium"}>
            {item.label}
          </Text>
          {item.id === "cart" && count !== undefined && count > 0 ? (
            <Text fontSize="2xs" color="white" fontWeight="bold">
              {count}
            </Text>
          ) : null}
        </VStack>
      </NavLink>
    </ChakraLink>
  )
}
