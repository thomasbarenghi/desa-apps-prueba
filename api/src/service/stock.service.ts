import { Injectable } from '@nestjs/common'
import { ProductStock } from '../model/stock.model'
import { StockRepository } from '../repository/stock.repository'

@Injectable()
export class StockService {
  constructor(private readonly stockRepository: StockRepository) {}

  async list(): Promise<ProductStock[]> {
    return this.stockRepository.findAll()
  }

  async findByProduct(productId: number): Promise<ProductStock | null> {
    return this.stockRepository.findByProduct(productId)
  }

  async findById(id: number): Promise<ProductStock | null> {
    return this.stockRepository.findById(id)
  }

  async upsert(productId: number, quantity: number): Promise<ProductStock> {
    const existing = await this.stockRepository.findByProduct(productId)
    if (existing) {
      const updated = await this.stockRepository.update(existing.id, { quantity })
      return updated!
    }
    return this.stockRepository.create({ productId, quantity })
  }

  async withoutStock(): Promise<ProductStock[]> {
    return this.stockRepository.findAll()
  }
}
