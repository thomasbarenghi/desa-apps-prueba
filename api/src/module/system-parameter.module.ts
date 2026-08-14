import { Module } from '@nestjs/common'
import { SystemParameterController } from '../controller/system-parameter.controller'
import { SystemParameterService } from '../service/system-parameter.service'
import { SystemParameterRepository } from '../repository/system-parameter.repository'

@Module({
  controllers: [SystemParameterController],
  providers: [SystemParameterService, SystemParameterRepository],
  exports: [SystemParameterService],
})
export class SystemParameterModule {}
