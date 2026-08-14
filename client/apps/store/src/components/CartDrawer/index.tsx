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
  Flex,
  Portal,
  Text,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useCartCount } from "../CartButton/hooks/useCartCount"
import type { CartDrawerProps } from "./types"

export const CartDrawer = ({ open, onClose, clientId }: CartDrawerProps) => {
  const { count } = useCartCount({ clientId })
  const isEmpty = count === 0

  return (
    <DrawerRoot open={open} onOpenChange={(details) => !details.open && onClose()} placement="end">
      <Portal>
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent h="100dvh" maxW="md">
            <DrawerHeader>
              <DrawerTitle>Mi carrito</DrawerTitle>
              <DrawerCloseTrigger />
            </DrawerHeader>
            <DrawerBody>
              {isEmpty ? (
                <Flex direction="column" align="center" justify="center" height="full" gap="2">
                  <Text color="fg.muted">Tu carrito está vacío.</Text>
                </Flex>
              ) : (
                <Text>Tenés {count} ítem{count > 1 ? "s" : ""} en tu carrito.</Text>
              )}
            </DrawerBody>
            <DrawerFooter>
              {isEmpty ? (
                <Button asChild width="full" variant="solid" bg="brand.600" color="white" onClick={onClose}>
                  <Link to="/catalogo">Explorar productos</Link>
                </Button>
              ) : (
                <Button asChild width="full" variant="solid" bg="brand.600" color="white" onClick={onClose}>
                  <Link to="/carrito">Ver carrito</Link>
                </Button>
              )}
            </DrawerFooter>
          </DrawerContent>
        </DrawerPositioner>
      </Portal>
    </DrawerRoot>
  )
}
