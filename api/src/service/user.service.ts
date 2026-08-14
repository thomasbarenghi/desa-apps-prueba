import { Injectable } from '@nestjs/common'
import { User } from '../model/user.model'
import { UserRepository } from '../repository/user.repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findById(id)
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email)
  }

  async listByRole(role: User['role']): Promise<User[]> {
    return this.userRepository.findByRole(role)
  }

  async create(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    return this.userRepository.create({ ...data, createdAt: new Date() })
  }

  async update(id: number, data: Partial<Omit<User, 'id'>>): Promise<User | null> {
    return this.userRepository.update(id, data)
  }
}
