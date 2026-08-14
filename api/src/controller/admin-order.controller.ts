import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
import { OrderQueryOrchestrator, OrderView } from '../service/order-query.orchestrator'
import { OrderStatusOrchestrator } from '../service/order-status.orchestrator'
import { ChangeOrderStatusDto } from '../dto/order-status.dto'
import { Order } from '../model/order.model'

@Controller('admin/orders')
export class AdminOrderController {
  constructor(
    private readonly orderQueryOrchestrator: OrderQueryOrchestrator,
    private readonly orderStatusOrchestrator: OrderStatusOrchestrator,
  ) {}

  @Get()
  list(): Promise<Order[]> {
    return this.orderQueryOrchestrator.listAll()
  }

  @Get(':orderId')
  view(@Param('orderId') orderId: string): Promise<OrderView> {
    return this.orderQueryOrchestrator.view(0, Number(orderId))
  }

  @Patch(':orderId/status')
  changeStatus(
    @Param('orderId') orderId: string,
    @Body() dto: ChangeOrderStatusDto,
  ): Promise<Order | null> {
    return this.orderStatusOrchestrator.changeStatus(Number(orderId), dto.status as Order['status'])
  }
}
