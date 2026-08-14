import { Injectable } from '@nestjs/common'
import { SystemParameter } from '../model/system-parameter.model'
import { SystemParameterRepository } from '../repository/system-parameter.repository'

@Injectable()
export class SystemParameterService {
  constructor(private readonly systemParameterRepository: SystemParameterRepository) {}

  async list(): Promise<SystemParameter[]> {
    return this.systemParameterRepository.findAll()
  }

  async findByKey(key: string): Promise<SystemParameter | null> {
    return this.systemParameterRepository.findByKey(key)
  }

  async findById(id: number): Promise<SystemParameter | null> {
    return this.systemParameterRepository.findById(id)
  }

  async create(data: Omit<SystemParameter, 'id'>): Promise<SystemParameter> {
    return this.systemParameterRepository.create(data)
  }

  async update(
    id: number,
    data: Partial<Omit<SystemParameter, 'id'>>,
  ): Promise<SystemParameter | null> {
    return this.systemParameterRepository.update(id, data)
  }

  async delete(id: number): Promise<void> {
    await this.systemParameterRepository.delete(id)
  }
}
