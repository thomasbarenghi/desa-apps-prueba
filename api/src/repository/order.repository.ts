import { Injectable } from '@nestjs/common'
import { Order, OrderItem, OrderItemOption, OrderStatusHistory } from '../model/order.model'
import { InMemoryRepository } from './in-memory.repository'

@Injectable()
export class OrderRepository extends InMemoryRepository<Order> {
  async findByClient(clientId: number): Promise<Order[]> {
    return this.items.filter((order) => order.clientId === clientId)
  }
}

@Injectable()
export class OrderItemRepository extends InMemoryRepository<OrderItem> {
  async findByOrder(orderId: number): Promise<OrderItem[]> {
    return this.items.filter((item) => item.orderId === orderId)
  }
}

@Injectable()
export class OrderItemOptionRepository extends InMemoryRepository<OrderItemOption> {
  async findByOrderItem(orderItemId: number): Promise<OrderItemOption[]> {
    return this.items.filter((option) => option.orderItemId === orderItemId)
  }
}

@Injectable()
export class OrderStatusHistoryRepository extends InMemoryRepository<OrderStatusHistory> {
  async findByOrder(orderId: number): Promise<OrderStatusHistory[]> {
    return this.items.filter((history) => history.orderId === orderId)
  }
}
