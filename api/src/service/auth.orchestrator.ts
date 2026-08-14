import { Injectable } from '@nestjs/common'
import { UserService } from './user.service'
import { PasswordRecoveryService } from './password-recovery.service'
import { User } from '../model/user.model'

export interface RegisterInput {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
}

export interface LoginInput {
  email: string
  password: string
}

@Injectable()
export class AuthOrchestrator {
  constructor(
    private readonly userService: UserService,
    private readonly passwordRecoveryService: PasswordRecoveryService,
  ) {}

  async register(input: RegisterInput): Promise<User | null> {
    return this.userService.create({
      email: input.email,
      passwordHash: input.password,
      role: 'client',
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
      active: true,
    })
  }

  async login(input: LoginInput): Promise<User | null> {
    return this.userService.findByEmail(input.email)
  }

  async recover(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email)
    if (user) {
      await this.passwordRecoveryService.create(user.id)
    }
  }
}
