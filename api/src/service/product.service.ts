import { Injectable } from '@nestjs/common'
import { Product } from '../model/product.model'
import { ProductRepository } from '../repository/product.repository'

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async list(): Promise<Product[]> {
    return this.productRepository.findAll()
  }

  async listAvailable(): Promise<Product[]> {
    return this.productRepository.findAvailable()
  }

  async findById(id: number): Promise<Product | null> {
    return this.productRepository.findById(id)
  }

  async create(data: Omit<Product, 'id'>): Promise<Product> {
    return this.productRepository.create(data)
  }

  async update(id: number, data: Partial<Omit<Product, 'id'>>): Promise<Product | null> {
    return this.productRepository.update(id, data)
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id)
  }
}
