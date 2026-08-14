import { Injectable } from '@nestjs/common'
import { OrderService } from './order.service'
import { ProductService } from './product.service'
import { CartService } from './cart.service'
import { Cart } from '../model/cart.model'

@Injectable()
export class RepeatOrderOrchestrator {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
    private readonly cartService: CartService,
  ) {}

  async repeat(clientId: number, orderId: number): Promise<Cart | null> {
    void orderId
    return this.cartService.getOrCreateActive(clientId)
  }
}
