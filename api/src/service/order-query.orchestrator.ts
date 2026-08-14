import { Injectable } from '@nestjs/common'
import { OrderService } from './order.service'
import { BranchService } from './branch.service'
import { Order } from '../model/order.model'

export interface OrderView {
  order: Order | null
  branchName: string | null
  history: Awaited<ReturnType<OrderService['history']>>
}

@Injectable()
export class OrderQueryOrchestrator {
  constructor(
    private readonly orderService: OrderService,
    private readonly branchService: BranchService,
  ) {}

  async listByClient(clientId: number): Promise<Order[]> {
    return this.orderService.listByClient(clientId)
  }

  async listAll(): Promise<Order[]> {
    return this.orderService.list()
  }

  async view(clientId: number, orderId: number): Promise<OrderView> {
    const order = await this.orderService.findById(orderId)
    const history = order ? await this.orderService.history(order.id) : []
    const branchName = order
      ? ((await this.branchService.findById(order.branchId))?.name ?? null)
      : null
    return { order, branchName, history }
  }
}
