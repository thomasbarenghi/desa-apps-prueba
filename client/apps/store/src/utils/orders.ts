import type { Order, OrderStatus } from "../types/order"

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  PREPARING: "En preparación",
  READY_FOR_DELIVERY: "Listo para entregar",
  ON_THE_WAY: "En camino",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
}

export const ORDER_STATUS_PALETTE = {
  PENDING: "yellow",
  CONFIRMED: "blue",
  PREPARING: "orange",
  READY_FOR_DELIVERY: "purple",
  ON_THE_WAY: "blue",
  DELIVERED: "green",
  CANCELLED: "red",
} as const satisfies Record<OrderStatus, string>

export const formatOrderDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

export const MOCK_ORDERS: Order[] = [
  {
    id: "o-128",
    number: 128,
    createdAt: "2026-08-14T14:02:00",
    status: "PREPARING",
    total: 16400,
    itemCount: 3,
    branch: "Centro",
    eta: "~35 min",
  },
  {
    id: "o-98",
    number: 98,
    createdAt: "2026-08-10T20:15:00",
    status: "DELIVERED",
    total: 12100,
    itemCount: 2,
    branch: "Centro",
  },
  {
    id: "o-75",
    number: 75,
    createdAt: "2026-08-02T13:40:00",
    status: "CANCELLED",
    total: 8900,
    itemCount: 1,
    branch: "Norte",
  },
]
