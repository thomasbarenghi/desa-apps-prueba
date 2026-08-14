import { Injectable } from '@nestjs/common'
import { GeneralState } from '../model/general-state.model'
import { InMemoryRepository } from './in-memory.repository'

@Injectable()
export class GeneralStateRepository extends InMemoryRepository<GeneralState> {
  async findByCode(code: string): Promise<GeneralState | null> {
    return this.items.find((state) => state.code === code) ?? null
  }

  async findByEntityType(entityType: string): Promise<GeneralState[]> {
    return this.items.filter((state) => state.entityType === entityType)
  }
}
