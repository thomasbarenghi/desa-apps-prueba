import { Injectable } from '@nestjs/common'
import { ProductStock } from '../model/stock.model'
import { InMemoryRepository } from './in-memory.repository'

@Injectable()
export class StockRepository extends InMemoryRepository<ProductStock> {
  async findByProduct(productId: number): Promise<ProductStock | null> {
    return this.items.find((stock) => stock.productId === productId) ?? null
  }
}
