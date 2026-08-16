import {
  Button,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerPositioner,
  DrawerRoot,
  DrawerTitle,
  HStack,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react"
import ShoppingCart from "@gravity-ui/icons/ShoppingCart"
import { Link } from "react-router-dom"
import { routes } from "../../routes"
import { cartTotal, useCartStore } from "../../stores/cartStore"
import { formatPrice } from "../../utils/catalog"
import { CartLineCard } from "../CartLineCard"
import { EmptyState } from "../EmptyState"
import type { CartDrawerProps } from "./types"

export const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const lines = useCartStore((state) => state.lines)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const removeLine = useCartStore((state) => state.removeLine)
  const isEmpty = lines.length === 0

  return (
    <DrawerRoot open={open} onOpenChange={(details) => !details.open && onClose()} placement="end">
      <Portal>
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent h="100dvh" maxW="md" bg="bg.panel">
            <DrawerHeader>
              <DrawerTitle>Mi carrito</DrawerTitle>
              <DrawerCloseTrigger />
            </DrawerHeader>
            <DrawerBody>
              {isEmpty ? (
                <EmptyState
                  icon={<ShoppingCart width={40} height={40} />}
                  title="Tu carrito está vacío"
                  description="Explorá el catálogo y sumá tus favoritos para armar el pedido."
                />
              ) : (
                <VStack gap="3" align="stretch">
                  {lines.map((line) => (
                    <CartLineCard
                      key={line.id}
                      line={line}
                      onQuantityChange={setQuantity}
                      onRemove={removeLine}
                    />
                  ))}
                </VStack>
              )}
            </DrawerBody>
            <DrawerFooter>
              <VStack gap="3" width="full" align="stretch">
                {!isEmpty ? (
                  <HStack justify="space-between">
                    <Text color="fg.muted">Total</Text>
                    <Text fontWeight="semibold" fontSize="lg" fontVariantNumeric="tabular-nums">
                      {formatPrice(cartTotal(lines))}
                    </Text>
                  </HStack>
                ) : null}
                <Button
                  asChild
                  width="full"
                  variant="solid"
                  bg="brand.600"
                  color="white"
                  _hover={{ bg: "brand.700" }}
                  onClick={onClose}
                >
                  <Link to={isEmpty ? routes.catalog : routes.cart}>
                    {isEmpty ? "Explorar productos" : "Ver carrito y confirmar"}
                  </Link>
                </Button>
              </VStack>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPositioner>
      </Portal>
    </DrawerRoot>
  )
}
