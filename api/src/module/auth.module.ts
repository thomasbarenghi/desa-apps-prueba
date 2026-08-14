import { Module } from '@nestjs/common'
import { AuthController } from '../controller/auth.controller'
import { AuthOrchestrator } from '../service/auth.orchestrator'
import { UserModule } from './user.module'

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthOrchestrator],
})
export class AuthModule {}
