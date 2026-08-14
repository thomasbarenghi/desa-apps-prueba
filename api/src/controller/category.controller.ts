import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { CategoryService } from '../service/category.service'
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto'
import { Category } from '../model/category.model'

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  list(): Promise<Category[]> {
    return this.categoryService.list()
  }

  @Post()
  create(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(dto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto): Promise<Category | null> {
    return this.categoryService.update(Number(id), dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoryService.delete(Number(id))
  }
}
