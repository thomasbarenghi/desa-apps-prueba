import { Module } from '@nestjs/common'
import { BranchController } from '../controller/branch.controller'
import { BranchService } from '../service/branch.service'
import { BranchRepository, BranchHourRepository } from '../repository/branch.repository'

@Module({
  controllers: [BranchController],
  providers: [BranchService, BranchRepository, BranchHourRepository],
  exports: [BranchService, BranchRepository],
})
export class BranchModule {}
