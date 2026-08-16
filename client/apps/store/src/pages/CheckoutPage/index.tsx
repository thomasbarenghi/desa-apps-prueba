import { Box, Button, Field, Heading, HStack, Input, Text, VStack } from "@chakra-ui/react"
import CircleCheckFill from "@gravity-ui/icons/CircleCheckFill"
import { useState } from "react"
import { Link } from "react-router-dom"
import { BackButton } from "../../components/BackButton"
import { EmptyState } from "../../components/EmptyState"
import { routes } from "../../routes"
import { cartTotal, lineTotal, useCartStore } from "../../stores/cartStore"
import { selectedAddress, useAddressStore } from "../../stores/addressStore"
import { formatPrice } from "../../utils/catalog"

export const CheckoutPage = () => {
  const lines = useCartStore((state) => state.lines)
  const clear = useCartStore((state) => state.clear)
  const selected = useAddressStore(selectedAddress)
  const [confirmed, setConfirmed] = useState(false)
  const [address, setAddress] = useState(selected?.street ?? "")
  const [city, setCity] = useState(selected?.city ?? "")
  const total = cartTotal(lines)

  const addressComplete = address.trim() !== "" && city.trim() !== ""

  if (confirmed) {
    return (
      <VStack align="center" gap="4" paddingY="16" textAlign="center">
        <Box color="success">
          <CircleCheckFill width={56} height={56} />
        </Box>
        <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold">
          ¡Pedido confirmado!
        </Heading>
        <VStack gap="1">
          <Text fontWeight="semibold">Pedido #000128</Text>
          <Text color="fg.muted">
            Envío a {address}, {city}
          </Text>
          <Text color="fg.muted">Sucursal asignada: Centro · Tiempo estimado: 35 min</Text>
        </VStack>
        <HStack gap="3" flexWrap="wrap" justifyContent="center" marginTop="2">
          <Button asChild size="lg" borderRadius="full" paddingX="7" bg="brand.600" color="white" _hover={{ bg: "brand.700" }}>
            <Link to={routes.orders}>Ver mis pedidos</Link>
          </Button>
          <Button asChild size="lg" borderRadius="full" paddingX="7" variant="outline" color="fg" borderColor="border.emphasized">
            <Link to={routes.home}>Volver al inicio</Link>
          </Button>
        </HStack>
      </VStack>
    )
  }

  if (lines.length === 0) {
    return (
      <EmptyState
        title="Nada para confirmar"
        description="Tu carrito está vacío. Sumá productos antes de continuar."
        action={
          <Button asChild bg="brand.600" color="white" borderRadius="full" _hover={{ bg: "brand.700" }}>
            <Link to={routes.catalog}>Ir al catálogo</Link>
          </Button>
        }
      />
    )
  }

  return (
    <VStack align="stretch" gap="6" maxW="2xl" marginX="auto">
      <BackButton />
      <VStack align="start" gap="1">
        <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold">
          Confirmar pedido
        </Heading>
        <Text color="fg.muted">¿A dónde te lo llevamos?</Text>
      </VStack>

      <Box bg="bg.panel" border="1px solid" borderColor="border.subtle" borderRadius="2xl" padding="5">
        <Text fontWeight="semibold" marginBottom="4">
          Dirección de entrega
        </Text>
        <VStack gap="4" align="stretch">
          <Field.Root>
            <Field.Label>Calle y número</Field.Label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Av. Ejemplo 123"
              size="lg"
              borderRadius="xl"
              bg="bg.subtle"
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Localidad</Field.Label>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Hurlingham"
              size="lg"
              borderRadius="xl"
              bg="bg.subtle"
            />
          </Field.Root>
        </VStack>
      </Box>

      <Box bg="bg.panel" border="1px solid" borderColor="border.subtle" borderRadius="2xl" padding="5">
        <Text color="fg.muted" fontSize="sm" marginBottom="3">
          Productos
        </Text>
        <VStack gap="3" align="stretch">
          {lines.map((line) => (
            <HStack key={line.id} justify="space-between">
              <Text>
                {line.quantity} × {line.name}
              </Text>
              <Text fontWeight="medium" fontVariantNumeric="tabular-nums">
                {formatPrice(lineTotal(line))}
              </Text>
            </HStack>
          ))}
        </VStack>
      </Box>

      <Box bg="bg.subtle" border="1px solid" borderColor="border.subtle" borderRadius="2xl" padding="5">
        <HStack justify="space-between" marginBottom="3">
          <Text fontWeight="semibold">Total</Text>
          <Text fontWeight="bold" fontSize="xl" fontVariantNumeric="tabular-nums">
            {formatPrice(total)}
          </Text>
        </HStack>
        <Text color="fg.subtle" fontSize="sm">
          La sucursal se asigna automáticamente al confirmar. No se paga en línea.
        </Text>
      </Box>

      <Button
        width="full"
        size="lg"
        borderRadius="full"
        bg="brand.600"
        color="white"
        _hover={{ bg: "brand.700" }}
        disabled={!addressComplete}
        onClick={() => {
          clear()
          setConfirmed(true)
        }}
      >
        Confirmar pedido
      </Button>
    </VStack>
  )
}
