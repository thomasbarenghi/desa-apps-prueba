import { Injectable } from '@nestjs/common'
import { Product } from '../model/product.model'
import { InMemoryRepository } from './in-memory.repository'

@Injectable()
export class ProductRepository extends InMemoryRepository<Product> {
  async findByCategory(categoryId: number): Promise<Product[]> {
    return this.items.filter((product) => product.categoryId === categoryId)
  }

  async findAvailable(): Promise<Product[]> {
    return this.items.filter((product) => product.available)
  }
}
