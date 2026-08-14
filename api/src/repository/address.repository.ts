import { Injectable } from '@nestjs/common'
import { Address } from '../model/address.model'
import { InMemoryRepository } from './in-memory.repository'

@Injectable()
export class AddressRepository extends InMemoryRepository<Address> {
  async findByClient(clientId: number): Promise<Address[]> {
    return this.items.filter((address) => address.clientId === clientId)
  }
}
