export type CartStatus = 'active' | 'confirmed'

export interface Cart {
  id: number
  clientId: number
  status: CartStatus
  createdAt: Date
}

export interface CartItem {
  id: number
  cartId: number
  productId: number
  quantity: number
  observations: string | null
}

export interface CartItemOption {
  id: number
  cartItemId: number
  configOptionId: number
}
