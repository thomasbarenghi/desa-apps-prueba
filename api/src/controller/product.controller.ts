import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ProductService } from '../service/product.service'
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto'
import { Product } from '../model/product.model'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  list(): Promise<Product[]> {
    return this.productService.list()
  }

  @Post()
  create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productService.create(dto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto): Promise<Product | null> {
    return this.productService.update(Number(id), dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productService.delete(Number(id))
  }
}
