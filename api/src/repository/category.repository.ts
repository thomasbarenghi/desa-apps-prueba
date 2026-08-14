import { Injectable } from '@nestjs/common'
import { Category } from '../model/category.model'
import { InMemoryRepository } from './in-memory.repository'

@Injectable()
export class CategoryRepository extends InMemoryRepository<Category> {
  async findActive(): Promise<Category[]> {
    return this.items.filter((category) => category.active)
  }
}
