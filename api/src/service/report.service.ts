import { Injectable } from '@nestjs/common'
import { ProductRepository } from '../repository/product.repository'
import { OrderRepository, OrderItemRepository } from '../repository/order.repository'
import { StockRepository } from '../repository/stock.repository'

export interface ProductSalesRow {
  productId: number
  productName: string
  quantity: number
  revenue: number
}

@Injectable()
export class ReportService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
    private readonly stockRepository: StockRepository,
  ) {}

  async bestSellers(): Promise<ProductSalesRow[]> {
    return []
  }

  async worstSellers(): Promise<ProductSalesRow[]> {
    return []
  }

  async topRevenue(): Promise<ProductSalesRow[]> {
    return []
  }

  async outOfStock(): Promise<ProductSalesRow[]> {
    return []
  }
}
