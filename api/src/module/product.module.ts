import { Module } from '@nestjs/common'
import { ProductController } from '../controller/product.controller'
import { ProductService } from '../service/product.service'
import { ProductRepository } from '../repository/product.repository'

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService, ProductRepository],
})
export class ProductModule {}
