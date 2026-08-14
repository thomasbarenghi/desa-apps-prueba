import { Injectable } from '@nestjs/common'
import { PasswordRecovery } from '../model/password-recovery.model'
import { PasswordRecoveryRepository } from '../repository/password-recovery.repository'

@Injectable()
export class PasswordRecoveryService {
  constructor(private readonly repository: PasswordRecoveryRepository) {}

  async create(userId: number): Promise<PasswordRecovery> {
    return this.repository.create({ userId, token: '', expiresAt: new Date(), used: false })
  }

  async findByToken(token: string): Promise<PasswordRecovery | null> {
    return this.repository.findByToken(token)
  }

  async markUsed(id: number): Promise<void> {
    await this.repository.update(id, { used: true })
  }
}
