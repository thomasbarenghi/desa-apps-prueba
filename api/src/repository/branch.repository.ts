import { Injectable } from '@nestjs/common'
import { Branch, BranchHour } from '../model/branch.model'
import { InMemoryRepository } from './in-memory.repository'

@Injectable()
export class BranchRepository extends InMemoryRepository<Branch> {
  async findActive(): Promise<Branch[]> {
    return this.items.filter((branch) => branch.active)
  }
}

@Injectable()
export class BranchHourRepository extends InMemoryRepository<BranchHour> {
  async findByBranch(branchId: number): Promise<BranchHour[]> {
    return this.items.filter((hour) => hour.branchId === branchId)
  }
}
