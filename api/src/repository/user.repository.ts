import { Injectable } from '@nestjs/common'
import { User } from '../model/user.model'
import { InMemoryRepository } from './in-memory.repository'

@Injectable()
export class UserRepository extends InMemoryRepository<User> {
  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((user) => user.email === email) ?? null
  }

  async findByRole(role: User['role']): Promise<User[]> {
    return this.items.filter((user) => user.role === role)
  }
}
