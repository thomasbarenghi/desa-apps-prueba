import { Injectable } from '@nestjs/common'
import { Cart, CartItem, CartItemOption } from '../model/cart.model'
import { InMemoryRepository } from './in-memory.repository'

@Injectable()
export class CartRepository extends InMemoryRepository<Cart> {
  async findActiveByClient(clientId: number): Promise<Cart | null> {
    return this.items.find((cart) => cart.clientId === clientId && cart.status === 'active') ?? null
  }
}

@Injectable()
export class CartItemRepository extends InMemoryRepository<CartItem> {
  async findByCart(cartId: number): Promise<CartItem[]> {
    return this.items.filter((item) => item.cartId === cartId)
  }
}

@Injectable()
export class CartItemOptionRepository extends InMemoryRepository<CartItemOption> {
  async findByCartItem(cartItemId: number): Promise<CartItemOption[]> {
    return this.items.filter((option) => option.cartItemId === cartItemId)
  }
}
