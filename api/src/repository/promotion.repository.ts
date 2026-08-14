import { Injectable } from '@nestjs/common'
import { Promotion } from '../model/promotion.model'
import { InMemoryRepository } from './in-memory.repository'

@Injectable()
export class PromotionRepository extends InMemoryRepository<Promotion> {
  async findActive(): Promise<Promotion[]> {
    return this.items.filter((promotion) => promotion.active)
  }
}
