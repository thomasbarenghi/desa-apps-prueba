import { Module } from '@nestjs/common'
import { ProductConfigController } from '../controller/product-config.controller'
import { ProductConfigService } from '../service/product-config.service'
import {
  ProductConfigGroupRepository,
  ProductConfigOptionRepository,
} from '../repository/product-config.repository'

@Module({
  controllers: [ProductConfigController],
  providers: [ProductConfigService, ProductConfigGroupRepository, ProductConfigOptionRepository],
  exports: [ProductConfigService],
})
export class ProductConfigModule {}
