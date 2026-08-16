import { Box, Button, Heading, HStack, Link as ChakraLink, Text, VStack } from "@chakra-ui/react"
import ListUl from "@gravity-ui/icons/ListUl"
import { Link } from "react-router-dom"
import { EmptyState } from "../../components/EmptyState"
import { OrderStatusBadge } from "../../components/OrderStatusBadge"
import { OrderTimeline } from "../../components/OrderTimeline"
import { orderDetailPath, routes } from "../../routes"
import { formatPrice } from "../../utils/catalog"
import { formatOrderDate, isActiveOrder, MOCK_ORDERS } from "../../utils/orders"

export const OrdersPage = () => {
  const activeOrder = MOCK_ORDERS.find((order) => isActiveOrder(order.status))
  const pastOrders = MOCK_ORDERS.filter((order) => !isActiveOrder(order.status))

  return (
    <VStack align="stretch" gap="6" maxW="3xl">
      <VStack align="start" gap="1">
        <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold">
          Mis pedidos
        </Heading>
        <Text color="fg.muted">Seguí los pedidos en curso y revisá el historial.</Text>
      </VStack>

      {activeOrder ? (
        <Box bg="bg.subtle" border="1px solid" borderColor="border.subtle" borderRadius="2xl" padding="5">
          <HStack justify="space-between" marginBottom="2">
            <Text fontWeight="semibold" fontSize="lg">
              Pedido #{activeOrder.number}
            </Text>
            <OrderStatusBadge status={activeOrder.status} />
          </HStack>
          <Text color="fg.muted" fontSize="sm" marginBottom="4">
            {activeOrder.branch} · {activeOrder.eta ?? "Estimando tiempo"}
          </Text>
          <OrderTimeline status={activeOrder.status} />
          <Button
            asChild
            marginTop="5"
            width="full"
            borderRadius="full"
            bg="brand.600"
            color="white"
            _hover={{ bg: "brand.700" }}
          >
            <Link to={orderDetailPath(activeOrder.id)}>Ver seguimiento</Link>
          </Button>
        </Box>
      ) : null}

      <VStack gap="3" align="stretch">
        {pastOrders.map((order) => (
          <ChakraLink
            asChild
            key={order.id}
            display="block"
            bg="bg.panel"
            border="1px solid"
            borderColor="border.subtle"
            borderRadius="2xl"
            padding="5"
            _hover={{ borderColor: "border.emphasized" }}
          >
            <Link to={orderDetailPath(order.id)}>
              <HStack justify="space-between">
                <VStack align="start" gap="0.5">
                  <Text fontWeight="semibold">Pedido #{order.number}</Text>
                  <Text color="fg.muted" fontSize="sm">
                    {formatOrderDate(order.createdAt)}
                  </Text>
                </VStack>
                <OrderStatusBadge status={order.status} />
              </HStack>
              <HStack justify="space-between" marginTop="3">
                <Text color="fg.muted" fontSize="sm">
                  {order.itemCount} {order.itemCount === 1 ? "ítem" : "ítems"} · {order.branch}
                </Text>
                <Text fontWeight="semibold" fontVariantNumeric="tabular-nums">
                  {formatPrice(order.total)}
                </Text>
              </HStack>
            </Link>
          </ChakraLink>
        ))}
      </VStack>

      {MOCK_ORDERS.length === 0 ? (
        <EmptyState
          icon={<ListUl width={40} height={40} />}
          title="Todavía no tenés pedidos"
          description="Cuando hagas tu primer pedido, lo vas a ver acá."
          action={
            <Button asChild bg="brand.600" color="white" borderRadius="full" _hover={{ bg: "brand.700" }}>
              <Link to={routes.catalog}>Ir al catálogo</Link>
            </Button>
          }
        />
      ) : null}
    </VStack>
  )
}
