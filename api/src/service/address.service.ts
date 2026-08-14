import { Injectable } from '@nestjs/common'
import { Address } from '../model/address.model'
import { AddressRepository } from '../repository/address.repository'

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async listByClient(clientId: number): Promise<Address[]> {
    return this.addressRepository.findByClient(clientId)
  }

  async findOwned(clientId: number, addressId: number): Promise<Address | null> {
    const address = await this.addressRepository.findById(addressId)
    return address && address.clientId === clientId ? address : null
  }

  async create(clientId: number, data: Omit<Address, 'id' | 'clientId'>): Promise<Address> {
    return this.addressRepository.create({ ...data, clientId })
  }

  async update(
    clientId: number,
    addressId: number,
    data: Partial<Omit<Address, 'id' | 'clientId'>>,
  ): Promise<Address | null> {
    return this.addressRepository.update(addressId, data)
  }

  async delete(clientId: number, addressId: number): Promise<void> {
    await this.addressRepository.delete(addressId)
  }
}
