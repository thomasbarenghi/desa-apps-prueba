import { Module } from '@nestjs/common'
import { UserController, AdminUserController } from '../controller/user.controller'
import { UserService } from '../service/user.service'
import { PasswordRecoveryService } from '../service/password-recovery.service'
import { UserRepository } from '../repository/user.repository'
import { PasswordRecoveryRepository } from '../repository/password-recovery.repository'

@Module({
  controllers: [UserController, AdminUserController],
  providers: [UserService, PasswordRecoveryService, UserRepository, PasswordRecoveryRepository],
  exports: [UserService, PasswordRecoveryService],
})
export class UserModule {}
