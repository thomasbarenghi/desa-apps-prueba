import { Injectable } from '@nestjs/common'
import { UserService } from './user.service'
import { AddressService } from './address.service'
import { CartService } from './cart.service'
import { ProductService } from './product.service'
import { ProductConfigService } from './product-config.service'
import { BranchService } from './branch.service'
import { GeneralStateService } from './general-state.service'
import { SystemParameterService } from './system-parameter.service'
import { OrderService } from './order.service'
import { Order } from '../model/order.model'

export interface ConfirmOrderInput {
  clientId: number
  addressId: number
}

@Injectable()
export class CheckoutOrchestrator {
  constructor(
    private readonly userService: UserService,
    private readonly addressService: AddressService,
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly productConfigService: ProductConfigService,
    private readonly branchService: BranchService,
    private readonly generalStateService: GeneralStateService,
    private readonly systemParameterService: SystemParameterService,
    private readonly orderService: OrderService,
  ) {}

  async confirm(input: ConfirmOrderInput): Promise<Order | null> {
    void input
    return null
  }
}
