import { Injectable } from '@nestjs/common'
import { PasswordRecovery } from '../model/password-recovery.model'
import { InMemoryRepository } from './in-memory.repository'

@Injectable()
export class PasswordRecoveryRepository extends InMemoryRepository<PasswordRecovery> {
  async findByToken(token: string): Promise<PasswordRecovery | null> {
    return this.items.find((recovery) => recovery.token === token) ?? null
  }
}
