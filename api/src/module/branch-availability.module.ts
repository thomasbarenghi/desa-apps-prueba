import { Module } from '@nestjs/common'
import { BranchAvailabilityController } from '../controller/branch-availability.controller'
import { BranchAvailabilityOrchestrator } from '../service/branch-availability.orchestrator'
import { AddressModule } from './address.module'
import { BranchModule } from './branch.module'
import { SystemParameterModule } from './system-parameter.module'

@Module({
  imports: [AddressModule, BranchModule, SystemParameterModule],
  controllers: [BranchAvailabilityController],
  providers: [BranchAvailabilityOrchestrator],
})
export class BranchAvailabilityModule {}
