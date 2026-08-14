import { Box, Button, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import ListUl from "@gravity-ui/icons/ListUl"
import { Fragment } from "react"
import { Link } from "react-router-dom"
import { EmptyState } from "../../components/EmptyState"
import { OrderStatusBadge } from "../../components/OrderStatusBadge"
import type { OrderStatus } from "../../types/order"
import { formatPrice } from "../../utils/catalog"
import { formatOrderDate, MOCK_ORDERS } from "../../utils/orders"

const TRACKING_STEPS = ["Pendiente", "Confirmado", "En preparación", "En camino", "Entregado"]

const progressFor = (status: OrderStatus): number => {
  switch (status) {
    case "PENDING":
      return 0
    case "CONFIRMED":
      return 1
    case "PREPARING":
      return 2
    case "READY_FOR_DELIVERY":
    case "ON_THE_WAY":
      return 3
    case "DELIVERED":
      return 4
    default:
      return -1
  }
}

const isActive = (status: OrderStatus) => status !== "DELIVERED" && status !== "CANCELLED"

export const OrdersPage = () => {
  const activeOrder = MOCK_ORDERS.find((order) => isActive(order.status))
  const pastOrders = MOCK_ORDERS.filter((order) => !isActive(order.status))

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
        </Box>
      ) : null}

      <VStack gap="3" align="stretch">
        {pastOrders.map((order) => (
          <Box key={order.id} bg="bg.panel" border="1px solid" borderColor="border.subtle" borderRadius="2xl" padding="5">
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
          </Box>
        ))}
      </VStack>

      {MOCK_ORDERS.length === 0 ? (
        <EmptyState
          icon={<ListUl width={40} height={40} />}
          title="Todavía no tenés pedidos"
          description="Cuando hagas tu primer pedido, lo vas a ver acá."
          action={
            <Button asChild bg="brand.600" color="white" borderRadius="full" _hover={{ bg: "brand.700" }}>
              <Link to="/catalogo">Ir al catálogo</Link>
            </Button>
          }
        />
      ) : null}
    </VStack>
  )
}

const OrderTimeline = ({ status }: { status: OrderStatus }) => {
  const current = progressFor(status)

  return (
    <Box>
      <Flex align="center">
        {TRACKING_STEPS.map((label, index) => (
          <Fragment key={label}>
            <Box
              width="14px"
              height="14px"
              borderRadius="full"
              flexShrink={0}
              bg={index === current ? "brand.600" : index < current ? "brand.500" : "border.emphasized"}
            />
            {index < TRACKING_STEPS.length - 1 ? (
              <Box flex="1" height="2px" bg={index < current ? "brand.500" : "border.subtle"} marginX="1" />
            ) : null}
          </Fragment>
        ))}
      </Flex>
      <Flex marginTop="1.5">
        {TRACKING_STEPS.map((label, index) => (
          <Text
            key={label}
            flex="1"
            fontSize="2xs"
            textAlign={index === 0 ? "left" : index === TRACKING_STEPS.length - 1 ? "right" : "center"}
            color={index <= current ? "fg" : "fg.subtle"}
            fontWeight={index === current ? "semibold" : "medium"}
          >
            {label}
          </Text>
        ))}
      </Flex>
    </Box>
  )
}
