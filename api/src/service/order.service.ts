import { Injectable } from '@nestjs/common'
import { Order, OrderItem, OrderItemOption, OrderStatusHistory } from '../model/order.model'
import {
  OrderRepository,
  OrderItemRepository,
  OrderItemOptionRepository,
  OrderStatusHistoryRepository,
} from '../repository/order.repository'

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
    private readonly orderItemOptionRepository: OrderItemOptionRepository,
    private readonly statusHistoryRepository: OrderStatusHistoryRepository,
  ) {}

  async create(data: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    return this.orderRepository.create({ ...data, createdAt: new Date() })
  }

  async findById(id: number): Promise<Order | null> {
    return this.orderRepository.findById(id)
  }

  async listByClient(clientId: number): Promise<Order[]> {
    return this.orderRepository.findByClient(clientId)
  }

  async list(): Promise<Order[]> {
    return this.orderRepository.findAll()
  }

  async updateStatus(id: number, status: Order['status']): Promise<Order | null> {
    return this.orderRepository.update(id, { status })
  }

  async addItem(data: Omit<OrderItem, 'id'>): Promise<OrderItem> {
    return this.orderItemRepository.create(data)
  }

  async items(orderId: number): Promise<OrderItem[]> {
    return this.orderItemRepository.findByOrder(orderId)
  }

  async addItemOption(data: Omit<OrderItemOption, 'id'>): Promise<OrderItemOption> {
    return this.orderItemOptionRepository.create(data)
  }

  async history(orderId: number): Promise<OrderStatusHistory[]> {
    return this.statusHistoryRepository.findByOrder(orderId)
  }

  async addStatusHistory(data: Omit<OrderStatusHistory, 'id'>): Promise<OrderStatusHistory> {
    return this.statusHistoryRepository.create(data)
  }
}
