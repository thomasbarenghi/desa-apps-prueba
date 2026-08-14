import { Module } from '@nestjs/common'
import { AddressController } from '../controller/address.controller'
import { AddressService } from '../service/address.service'
import { AddressRepository } from '../repository/address.repository'

@Module({
  controllers: [AddressController],
  providers: [AddressService, AddressRepository],
  exports: [AddressService, AddressRepository],
})
export class AddressModule {}
