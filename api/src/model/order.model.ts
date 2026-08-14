export type OrderStatus =
  | 'Pendiente'
  | 'Confirmado'
  | 'En preparación'
  | 'Listo para entregar'
  | 'En camino'
  | 'Entregado'
  | 'Cancelado'

export interface Order {
  id: number
  clientId: number
  cartId: number
  branchId: number
  addressId: number
  status: OrderStatus
  createdAt: Date
  total: number
  estimatedDeliveryAt: Date | null
  deliveryAddressText: string
  deliveryLatitude: number
  deliveryLongitude: number
}

export interface OrderItem {
  id: number
  orderId: number
  productId: number
  productName: string
  unitPrice: number
  quantity: number
  observations: string | null
  subtotal: number
}

export interface OrderItemOption {
  id: number
  orderItemId: number
  configOptionId: number
  optionName: string
  extraPrice: number
}

export interface OrderStatusHistory {
  id: number
  orderId: number
  previousStatus: OrderStatus | null
  newStatus: OrderStatus
  changedAt: Date
}
