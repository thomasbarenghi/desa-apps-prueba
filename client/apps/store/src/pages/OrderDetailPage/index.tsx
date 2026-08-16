import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react"
import CircleCheckFill from "@gravity-ui/icons/CircleCheckFill"
import CircleXmarkFill from "@gravity-ui/icons/CircleXmarkFill"
import { Link, useParams } from "react-router-dom"
import { BackButton } from "../../components/BackButton"
import { EmptyState } from "../../components/EmptyState"
import { OrderStatusBadge } from "../../components/OrderStatusBadge"
import { OrderTimeline } from "../../components/OrderTimeline"
import { useOrder } from "../../hooks/useOrder"
import { routes } from "../../routes"
import type { Order } from "../../types/order"
import { formatPrice } from "../../utils/catalog"
import { buildStaticMapUrl } from "../../utils/geoapify"
import { formatOrderDate, isActiveOrder } from "../../utils/orders"
import { useRiderPosition } from "./hooks/useRiderPosition"

export const OrderDetailPage = () => {
  const { orderId } = useParams()
  const { order, isLoading } = useOrder(orderId)

  if (isLoading) {
    return (
      <Box paddingY="24" display="flex" justifyContent="center">
        <Spinner size="lg" color="brand.600" />
      </Box>
    )
  }

  if (!order) {
    return (
      <EmptyState
        title="Pedido no encontrado"
        description="No pudimos encontrar este pedido. Probá desde la lista de pedidos."
        action={
          <Button asChild bg="brand.600" color="white" borderRadius="full" _hover={{ bg: "brand.700" }}>
            <Link to={routes.orders}>Volver a mis pedidos</Link>
          </Button>
        }
      />
    )
  }

  const active = isActiveOrder(order.status)

  return (
    <VStack align="stretch" gap="6" maxW="3xl">
      <BackButton />

      <VStack align="start" gap="1">
        <HStack gap="3" flexWrap="wrap">
          <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold">
            Pedido #{order.number}
          </Heading>
          <OrderStatusBadge status={order.status} />
        </HStack>
        <Text color="fg.muted">Realizado el {formatOrderDate(order.createdAt)}</Text>
      </VStack>

      {active ? (
        <>
          <Box bg="bg.subtle" border="1px solid" borderColor="border.subtle" borderRadius="2xl" padding="5">
            <Text fontWeight="semibold" marginBottom="4">
              Estado del pedido
            </Text>
            <OrderTimeline status={order.status} />
            <Text color="fg.muted" fontSize="sm" marginTop="4">
              {order.branch} · {order.eta ?? "Estimando tiempo"}
            </Text>
          </Box>
          <TrackingMap order={order} />
        </>
      ) : null}

      {order.status === "CANCELLED" ? (
        <Box bg="bg.panel" border="1px solid" borderColor="border.subtle" borderRadius="2xl" padding="5">
          <Box color="danger" display="flex" marginBottom="2">
            <CircleXmarkFill width={28} height={28} />
          </Box>
          <Text fontWeight="semibold" fontSize="lg">
            Pedido cancelado
          </Text>
          <Text color="fg.muted" fontSize="sm" marginTop="1">
            {order.cancelReason}
          </Text>
        </Box>
      ) : null}

      {order.status === "DELIVERED" ? (
        <Box bg="bg.panel" border="1px solid" borderColor="border.subtle" borderRadius="2xl" padding="5">
          <Box color="success" display="flex" marginBottom="2">
            <CircleCheckFill width={28} height={28} />
          </Box>
          <Text fontWeight="semibold" fontSize="lg">
            Entregado
          </Text>
          <Text color="fg.muted" fontSize="sm" marginTop="1">
            Recibido el {order.deliveredAt ? formatOrderDate(order.deliveredAt) : "—"}
          </Text>
        </Box>
      ) : null}

      <Box bg="bg.panel" border="1px solid" borderColor="border.subtle" borderRadius="2xl" padding="5">
        <Text color="fg.muted" fontSize="sm" marginBottom="3">
          Productos
        </Text>
        <VStack gap="3" align="stretch">
          {order.items.map((item) => (
            <HStack key={item.id} justify="space-between">
              <Text>
                {item.quantity} × {item.name}
              </Text>
              <Text fontWeight="medium" fontVariantNumeric="tabular-nums">
                {formatPrice(item.unitPrice * item.quantity)}
              </Text>
            </HStack>
          ))}
        </VStack>
      </Box>

      <Box bg="bg.subtle" border="1px solid" borderColor="border.subtle" borderRadius="2xl" padding="5">
        <HStack justify="space-between" marginBottom="2">
          <Text fontWeight="semibold">Total</Text>
          <Text fontWeight="bold" fontSize="xl" fontVariantNumeric="tabular-nums">
            {formatPrice(order.total)}
          </Text>
        </HStack>
        <Text color="fg.subtle" fontSize="sm">Entrega a {order.deliveryAddress}</Text>
      </Box>
    </VStack>
  )
}

const TrackingMap = ({ order }: { order: Order }) => {
  const [isDesktop] = useMediaQuery(["(min-width: 48em)"], { ssr: false })
  const riderPosition = useRiderPosition(
    { lat: order.store.lat, lon: order.store.lon },
    { lat: order.client.lat, lon: order.client.lon },
    Boolean(order.rider),
  )

  const centerLat = (order.store.lat + order.client.lat) / 2
  const centerLon = (order.store.lon + order.client.lon) / 2

  const mapUrl = buildStaticMapUrl({
    centerLat,
    centerLon,
    zoom: 13,
    width: isDesktop ? 1200 : 600,
    height: isDesktop ? 340 : 700,
    markers: [
      { lat: order.store.lat, lon: order.store.lon, color: "#1d4ed8", label: "T" },
      { lat: order.client.lat, lon: order.client.lon, color: "#15803d", label: "C" },
      ...(order.rider
        ? [
            {
              lat: riderPosition.lat,
              lon: riderPosition.lon,
              color: "#ea580c",
              icon: "person-biking",
            },
          ]
        : []),
    ],
  })

  const legend = [
    { color: "info", title: "Tienda", subtitle: order.store.address },
    { color: "success", title: "Tu dirección", subtitle: order.client.address },
    ...(order.rider
      ? [
          {
            color: "brand.500",
            title: `Rider · ${order.rider.name}`,
            subtitle: order.rider.vehicle,
          },
        ]
      : []),
  ]

  return (
    <Box bg="bg.panel" border="1px solid" borderColor="border.subtle" borderRadius="2xl" overflow="hidden">
      <Box padding="4" paddingBottom="3">
        <HStack justify="space-between">
          <Text fontWeight="semibold">Seguimiento en vivo</Text>
          {order.rider ? (
            <HStack gap="1.5" color="success" alignItems="center">
              <Box width="8px" height="8px" borderRadius="full" bg="currentColor" />
              <Text fontSize="xs" fontWeight="semibold">
                En vivo
              </Text>
            </HStack>
          ) : null}
        </HStack>
      </Box>
      <Image
        src={mapUrl}
        alt="Mapa de seguimiento del pedido"
        width="100%"
        height="auto"
        bg="bg.muted"
      />
      <Box padding="4">
        <VStack gap="2.5" align="stretch">
          {legend.map((item) => (
            <HStack key={item.title} gap="2.5" align="flex-start">
              <Box
                width="10px"
                height="10px"
                borderRadius="full"
                bg={item.color}
                flexShrink={0}
                marginTop="1.5"
              />
              <Box>
                <Text fontSize="sm" fontWeight="semibold">
                  {item.title}
                </Text>
                <Text fontSize="sm" color="fg.muted">
                  {item.subtitle}
                </Text>
              </Box>
            </HStack>
          ))}
        </VStack>
        <Text fontSize="2xs" color="fg.subtle" marginTop="3">
          © OpenStreetMap · Geoapify
        </Text>
      </Box>
    </Box>
  )
}
