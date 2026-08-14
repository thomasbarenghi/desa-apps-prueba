import { Box, Button, Grid, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import ShoppingCart from "@gravity-ui/icons/ShoppingCart"
import { Link } from "react-router-dom"
import { CartLineCard } from "../../components/CartLineCard"
import { EmptyState } from "../../components/EmptyState"
import { cartItemCount, cartTotal, useCartStore } from "../../stores/cartStore"
import { formatPrice } from "../../utils/catalog"

export const CartPage = () => {
  const lines = useCartStore((state) => state.lines)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const removeLine = useCartStore((state) => state.removeLine)

  const count = cartItemCount(lines)
  const total = cartTotal(lines)

  if (lines.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingCart width={40} height={40} />}
        title="Tu carrito está vacío"
        description="Explorá el catálogo y armá tu pedido."
        action={
          <Button asChild bg="brand.600" color="white" borderRadius="full" _hover={{ bg: "brand.700" }}>
            <Link to="/catalogo">Explorar productos</Link>
          </Button>
        }
      />
    )
  }

  return (
    <VStack align="stretch" gap="6">
      <VStack align="start" gap="1">
        <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold">
          Mi carrito
        </Heading>
        <Text color="fg.muted">
          {count} {count === 1 ? "ítem" : "ítems"}
        </Text>
      </VStack>

      <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap="6" alignItems="start">
        <VStack gap="3" align="stretch">
          {lines.map((line) => (
            <CartLineCard key={line.id} line={line} onQuantityChange={setQuantity} onRemove={removeLine} />
          ))}
        </VStack>

        <Box
          position={{ md: "sticky" }}
          top="24"
          bg="bg.subtle"
          border="1px solid"
          borderColor="border.subtle"
          borderRadius="2xl"
          padding="5"
        >
          <VStack gap="4" align="stretch">
            <HStack justify="space-between">
              <Text color="fg.muted">Total</Text>
              <Text fontWeight="bold" fontSize="xl" fontVariantNumeric="tabular-nums">
                {formatPrice(total)}
              </Text>
            </HStack>
            <Text color="fg.subtle" fontSize="sm">
              La sucursal se asigna automáticamente. No se paga en línea.
            </Text>
            <Button
              asChild
              width="full"
              size="lg"
              borderRadius="full"
              bg="brand.600"
              color="white"
              _hover={{ bg: "brand.700" }}
            >
              <Link to="/checkout">Continuar con el pedido</Link>
            </Button>
          </VStack>
        </Box>
      </Grid>
    </VStack>
  )
}
