import { Module } from '@nestjs/common'
import { GeneralStateController } from '../controller/general-state.controller'
import { GeneralStateService } from '../service/general-state.service'
import { GeneralStateRepository } from '../repository/general-state.repository'

@Module({
  controllers: [GeneralStateController],
  providers: [GeneralStateService, GeneralStateRepository],
  exports: [GeneralStateService],
})
export class GeneralStateModule {}
