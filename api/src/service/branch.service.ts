import { Injectable } from '@nestjs/common'
import { Branch, BranchHour } from '../model/branch.model'
import { BranchRepository, BranchHourRepository } from '../repository/branch.repository'

@Injectable()
export class BranchService {
  constructor(
    private readonly branchRepository: BranchRepository,
    private readonly branchHourRepository: BranchHourRepository,
  ) {}

  async list(): Promise<Branch[]> {
    return this.branchRepository.findAll()
  }

  async findActive(): Promise<Branch[]> {
    return this.branchRepository.findActive()
  }

  async findById(id: number): Promise<Branch | null> {
    return this.branchRepository.findById(id)
  }

  async create(data: Omit<Branch, 'id'>): Promise<Branch> {
    return this.branchRepository.create(data)
  }

  async update(id: number, data: Partial<Omit<Branch, 'id'>>): Promise<Branch | null> {
    return this.branchRepository.update(id, data)
  }

  async delete(id: number): Promise<void> {
    await this.branchRepository.delete(id)
  }

  async hours(branchId: number): Promise<BranchHour[]> {
    return this.branchHourRepository.findByBranch(branchId)
  }

  async addHour(branchId: number, data: Omit<BranchHour, 'id' | 'branchId'>): Promise<BranchHour> {
    return this.branchHourRepository.create({ ...data, branchId })
  }
}
