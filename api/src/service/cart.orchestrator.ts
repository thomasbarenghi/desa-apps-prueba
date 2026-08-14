import { Injectable } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductConfigService } from './product-config.service'
import { CartService } from './cart.service'
import { Cart } from '../model/cart.model'

export interface AddItemInput {
  clientId: number
  productId: number
  quantity: number
  observations?: string
  configOptionIds?: number[]
}

@Injectable()
export class CartOrchestrator {
  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly productConfigService: ProductConfigService,
  ) {}

  async addItem(input: AddItemInput): Promise<Cart | null> {
    const cart = await this.cartService.getOrCreateActive(input.clientId)
    return cart
  }
}
