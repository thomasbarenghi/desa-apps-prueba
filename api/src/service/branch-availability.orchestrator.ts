import { Injectable } from '@nestjs/common'
import { AddressService } from './address.service'
import { BranchService } from './branch.service'
import { SystemParameterService } from './system-parameter.service'
import { Branch } from '../model/branch.model'

export interface BranchAvailability {
  branch: Branch
  distanceKm: number
}

@Injectable()
export class BranchAvailabilityOrchestrator {
  constructor(
    private readonly addressService: AddressService,
    private readonly branchService: BranchService,
    private readonly systemParameterService: SystemParameterService,
  ) {}

  async availableFor(clientId: number, addressId: number): Promise<BranchAvailability[]> {
    void clientId
    void addressId
    return []
  }
}
