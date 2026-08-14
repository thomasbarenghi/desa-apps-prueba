import { Module } from '@nestjs/common'
import { ReportController } from '../controller/report.controller'
import { ReportService } from '../service/report.service'
import { ProductModule } from './product.module'
import { OrderModule } from './order.module'
import { StockModule } from './stock.module'

@Module({
  imports: [ProductModule, OrderModule, StockModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
