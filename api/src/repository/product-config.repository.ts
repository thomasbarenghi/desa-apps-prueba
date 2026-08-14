import { Injectable } from '@nestjs/common'
import { ProductConfigGroup, ProductConfigOption } from '../model/product-config.model'
import { InMemoryRepository } from './in-memory.repository'

@Injectable()
export class ProductConfigGroupRepository extends InMemoryRepository<ProductConfigGroup> {
  async findByProduct(productId: number): Promise<ProductConfigGroup[]> {
    return this.items.filter((group) => group.productId === productId)
  }
}

@Injectable()
export class ProductConfigOptionRepository extends InMemoryRepository<ProductConfigOption> {
  async findByGroup(groupId: number): Promise<ProductConfigOption[]> {
    return this.items.filter((option) => option.groupId === groupId)
  }
}
