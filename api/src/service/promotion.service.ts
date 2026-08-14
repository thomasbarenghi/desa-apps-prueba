import { Injectable } from '@nestjs/common'
import { Promotion } from '../model/promotion.model'
import { PromotionRepository } from '../repository/promotion.repository'

@Injectable()
export class PromotionService {
  constructor(private readonly promotionRepository: PromotionRepository) {}

  async list(): Promise<Promotion[]> {
    return this.promotionRepository.findAll()
  }

  async listActive(): Promise<Promotion[]> {
    return this.promotionRepository.findActive()
  }

  async findById(id: number): Promise<Promotion | null> {
    return this.promotionRepository.findById(id)
  }

  async create(data: Omit<Promotion, 'id'>): Promise<Promotion> {
    return this.promotionRepository.create(data)
  }

  async update(id: number, data: Partial<Omit<Promotion, 'id'>>): Promise<Promotion | null> {
    return this.promotionRepository.update(id, data)
  }

  async delete(id: number): Promise<void> {
    await this.promotionRepository.delete(id)
  }
}
