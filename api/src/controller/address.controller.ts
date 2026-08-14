import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { AddressService } from '../service/address.service'
import { CreateAddressDto, UpdateAddressDto } from '../dto/address.dto'
import { Address } from '../model/address.model'

@Controller('clients/:clientId/addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  list(@Param('clientId') clientId: string): Promise<Address[]> {
    return this.addressService.listByClient(Number(clientId))
  }

  @Post()
  create(@Param('clientId') clientId: string, @Body() dto: CreateAddressDto): Promise<Address> {
    return this.addressService.create(Number(clientId), dto)
  }

  @Patch(':addressId')
  update(
    @Param('clientId') clientId: string,
    @Param('addressId') addressId: string,
    @Body() dto: UpdateAddressDto,
  ): Promise<Address | null> {
    return this.addressService.update(Number(clientId), Number(addressId), dto)
  }

  @Delete(':addressId')
  remove(
    @Param('clientId') clientId: string,
    @Param('addressId') addressId: string,
  ): Promise<void> {
    return this.addressService.delete(Number(clientId), Number(addressId))
  }
}
