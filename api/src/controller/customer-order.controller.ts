import { Controller, Get, Param, Post } from '@nestjs/common'
import { OrderQueryOrchestrator, OrderView } from '../service/order-query.orchestrator'
import { RepeatOrderOrchestrator } from '../service/repeat-order.orchestrator'
import { Order } from '../model/order.model'
import { Cart } from '../model/cart.model'

@Controller('clients/:clientId/orders')
export class CustomerOrderController {
  constructor(
    private readonly orderQueryOrchestrator: OrderQueryOrchestrator,
    private readonly repeatOrderOrchestrator: RepeatOrderOrchestrator,
  ) {}

  @Get()
  list(@Param('clientId') clientId: string): Promise<Order[]> {
    return this.orderQueryOrchestrator.listByClient(Number(clientId))
  }

  @Get(':orderId')
  view(@Param('clientId') clientId: string, @Param('orderId') orderId: string): Promise<OrderView> {
    return this.orderQueryOrchestrator.view(Number(clientId), Number(orderId))
  }

  @Post(':orderId/repeat')
  repeat(
    @Param('clientId') clientId: string,
    @Param('orderId') orderId: string,
  ): Promise<Cart | null> {
    return this.repeatOrderOrchestrator.repeat(Number(clientId), Number(orderId))
  }
}
