import { Injectable } from '@nestjs/common'
import { SystemParameter } from '../model/system-parameter.model'
import { InMemoryRepository } from './in-memory.repository'

@Injectable()
export class SystemParameterRepository extends InMemoryRepository<SystemParameter> {
  async findByKey(key: string): Promise<SystemParameter | null> {
    return this.items.find((parameter) => parameter.parameterKey === key) ?? null
  }
}
