import { Injectable } from '@nestjs/common'
import { ProductConfigGroup, ProductConfigOption } from '../model/product-config.model'
import {
  ProductConfigGroupRepository,
  ProductConfigOptionRepository,
} from '../repository/product-config.repository'

@Injectable()
export class ProductConfigService {
  constructor(
    private readonly groupRepository: ProductConfigGroupRepository,
    private readonly optionRepository: ProductConfigOptionRepository,
  ) {}

  async listGroupsByProduct(productId: number): Promise<ProductConfigGroup[]> {
    return this.groupRepository.findByProduct(productId)
  }

  async listOptionsByGroup(groupId: number): Promise<ProductConfigOption[]> {
    return this.optionRepository.findByGroup(groupId)
  }

  async findOption(id: number): Promise<ProductConfigOption | null> {
    return this.optionRepository.findById(id)
  }

  async createGroup(data: Omit<ProductConfigGroup, 'id'>): Promise<ProductConfigGroup> {
    return this.groupRepository.create(data)
  }

  async createOption(data: Omit<ProductConfigOption, 'id'>): Promise<ProductConfigOption> {
    return this.optionRepository.create(data)
  }
}
