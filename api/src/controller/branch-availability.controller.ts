import { Controller, Get, Param } from '@nestjs/common'
import {
  BranchAvailabilityOrchestrator,
  BranchAvailability,
} from '../service/branch-availability.orchestrator'

@Controller('clients/:clientId/branches')
export class BranchAvailabilityController {
  constructor(private readonly orchestrator: BranchAvailabilityOrchestrator) {}

  @Get('available/:addressId')
  available(
    @Param('clientId') clientId: string,
    @Param('addressId') addressId: string,
  ): Promise<BranchAvailability[]> {
    return this.orchestrator.availableFor(Number(clientId), Number(addressId))
  }
}
