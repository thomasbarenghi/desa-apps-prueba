import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ProductConfigService } from '../service/product-config.service'
import { CreateConfigGroupDto, CreateConfigOptionDto } from '../dto/product-config.dto'
import { ProductConfigGroup, ProductConfigOption } from '../model/product-config.model'

@Controller('products')
export class ProductConfigController {
  constructor(private readonly productConfigService: ProductConfigService) {}

  @Get(':productId/config-groups')
  groups(@Param('productId') productId: string): Promise<ProductConfigGroup[]> {
    return this.productConfigService.listGroupsByProduct(Number(productId))
  }

  @Post('config-groups')
  createGroup(@Body() dto: CreateConfigGroupDto): Promise<ProductConfigGroup> {
    return this.productConfigService.createGroup(dto)
  }

  @Get('config-groups/:groupId/options')
  options(@Param('groupId') groupId: string): Promise<ProductConfigOption[]> {
    return this.productConfigService.listOptionsByGroup(Number(groupId))
  }

  @Post('config-options')
  createOption(@Body() dto: CreateConfigOptionDto): Promise<ProductConfigOption> {
    return this.productConfigService.createOption(dto)
  }
}
