import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { StockService } from '../service/stock.service'
import { UpsertStockDto } from '../dto/stock.dto'
import { ProductStock } from '../model/stock.model'

@Controller('admin/stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  list(): Promise<ProductStock[]> {
    return this.stockService.list()
  }

  @Get('without-stock')
  withoutStock(): Promise<ProductStock[]> {
    return this.stockService.withoutStock()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductStock | null> {
    return this.stockService.findById(Number(id))
  }

  @Post()
  upsert(@Body() dto: UpsertStockDto): Promise<ProductStock> {
    return this.stockService.upsert(dto.productId, dto.quantity)
  }
}
