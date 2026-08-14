import { Injectable } from '@nestjs/common'
import { Cart, CartItem, CartItemOption } from '../model/cart.model'
import {
  CartRepository,
  CartItemRepository,
  CartItemOptionRepository,
} from '../repository/cart.repository'

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly cartItemRepository: CartItemRepository,
    private readonly cartItemOptionRepository: CartItemOptionRepository,
  ) {}

  async getOrCreateActive(clientId: number): Promise<Cart | null> {
    return this.cartRepository.findActiveByClient(clientId)
  }

  async addItem(cartId: number, data: Omit<CartItem, 'id'>): Promise<CartItem> {
    return this.cartItemRepository.create(data)
  }

  async updateItem(
    cartId: number,
    itemId: number,
    data: Partial<Omit<CartItem, 'id'>>,
  ): Promise<CartItem | null> {
    return this.cartItemRepository.update(itemId, data)
  }

  async removeItem(cartId: number, itemId: number): Promise<void> {
    await this.cartItemRepository.delete(itemId)
  }

  async items(cartId: number): Promise<CartItem[]> {
    return this.cartItemRepository.findByCart(cartId)
  }

  async addItemOption(cartItemId: number, configOptionId: number): Promise<CartItemOption> {
    return this.cartItemOptionRepository.create({ cartItemId, configOptionId })
  }

  async itemOptions(cartItemId: number): Promise<CartItemOption[]> {
    return this.cartItemOptionRepository.findByCartItem(cartItemId)
  }

  async markConfirmed(cartId: number): Promise<void> {
    await this.cartRepository.update(cartId, { status: 'confirmed' })
  }
}
