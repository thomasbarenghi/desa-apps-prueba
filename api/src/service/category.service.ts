import { Injectable } from '@nestjs/common'
import { Category } from '../model/category.model'
import { CategoryRepository } from '../repository/category.repository'

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async list(): Promise<Category[]> {
    return this.categoryRepository.findAll()
  }

  async listActive(): Promise<Category[]> {
    return this.categoryRepository.findActive()
  }

  async findById(id: number): Promise<Category | null> {
    return this.categoryRepository.findById(id)
  }

  async create(data: Omit<Category, 'id'>): Promise<Category> {
    return this.categoryRepository.create(data)
  }

  async update(id: number, data: Partial<Omit<Category, 'id'>>): Promise<Category | null> {
    return this.categoryRepository.update(id, data)
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id)
  }
}
