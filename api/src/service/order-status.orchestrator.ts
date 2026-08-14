import { Injectable } from '@nestjs/common'
import { OrderService } from './order.service'
import { GeneralStateService } from './general-state.service'
import { Order } from '../model/order.model'

@Injectable()
export class OrderStatusOrchestrator {
  constructor(
    private readonly orderService: OrderService,
    private readonly generalStateService: GeneralStateService,
  ) {}

  async changeStatus(orderId: number, newStatus: Order['status']): Promise<Order | null> {
    return this.orderService.updateStatus(orderId, newStatus)
  }
}
