import { Injectable } from '@nestjs/common'
import { GeneralState } from '../model/general-state.model'
import { GeneralStateRepository } from '../repository/general-state.repository'

@Injectable()
export class GeneralStateService {
  constructor(private readonly generalStateRepository: GeneralStateRepository) {}

  async list(): Promise<GeneralState[]> {
    return this.generalStateRepository.findAll()
  }

  async listByEntityType(entityType: string): Promise<GeneralState[]> {
    return this.generalStateRepository.findByEntityType(entityType)
  }

  async findByCode(code: string): Promise<GeneralState | null> {
    return this.generalStateRepository.findByCode(code)
  }

  async findById(id: number): Promise<GeneralState | null> {
    return this.generalStateRepository.findById(id)
  }

  async create(data: Omit<GeneralState, 'id'>): Promise<GeneralState> {
    return this.generalStateRepository.create(data)
  }

  async update(id: number, data: Partial<Omit<GeneralState, 'id'>>): Promise<GeneralState | null> {
    return this.generalStateRepository.update(id, data)
  }

  async delete(id: number): Promise<void> {
    await this.generalStateRepository.delete(id)
  }
}
