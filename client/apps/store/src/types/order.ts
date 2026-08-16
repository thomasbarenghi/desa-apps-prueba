export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY_FOR_DELIVERY"
  | "ON_THE_WAY"
  | "DELIVERED"
  | "CANCELLED"

export interface Order {
  id: string
  number: number
  createdAt: string
  status: OrderStatus
  total: number
  itemCount: number
  branch: string
  eta?: string
}
