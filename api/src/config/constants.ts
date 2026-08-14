import { OrderStatus } from '../model/order.model'

export const ORDER_STATE_TRANSITIONS: Record<OrderStatus, readonly OrderStatus[]> = {
  Pendiente: ['Confirmado', 'Cancelado'],
  Confirmado: ['En preparación', 'Cancelado'],
  'En preparación': ['Listo para entregar', 'Cancelado'],
  'Listo para entregar': ['En camino', 'Cancelado'],
  'En camino': ['Entregado', 'Cancelado'],
  Entregado: [],
  Cancelado: [],
}
