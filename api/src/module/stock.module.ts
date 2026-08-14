import { Module } from '@nestjs/common'
import { StockController } from '../controller/stock.controller'
import { StockService } from '../service/stock.service'
import { StockRepository } from '../repository/stock.repository'

@Module({
  controllers: [StockController],
  providers: [StockService, StockRepository],
  exports: [StockService, StockRepository],
})
export class StockModule {}
