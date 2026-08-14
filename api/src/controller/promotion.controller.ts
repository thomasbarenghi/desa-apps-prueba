import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { PromotionService } from '../service/promotion.service'
import { CreatePromotionDto, UpdatePromotionDto } from '../dto/promotion.dto'
import { Promotion } from '../model/promotion.model'

@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Get()
  list(): Promise<Promotion[]> {
    return this.promotionService.list()
  }

  @Post()
  create(@Body() dto: CreatePromotionDto): Promise<Promotion> {
    return this.promotionService.create(dto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePromotionDto): Promise<Promotion | null> {
    return this.promotionService.update(Number(id), dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.promotionService.delete(Number(id))
  }
}
