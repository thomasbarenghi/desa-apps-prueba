import { Controller, Get } from '@nestjs/common'
import { ReportService, ProductSalesRow } from '../service/report.service'

@Controller('admin/reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('best-sellers')
  bestSellers(): Promise<ProductSalesRow[]> {
    return this.reportService.bestSellers()
  }

  @Get('worst-sellers')
  worstSellers(): Promise<ProductSalesRow[]> {
    return this.reportService.worstSellers()
  }

  @Get('top-revenue')
  topRevenue(): Promise<ProductSalesRow[]> {
    return this.reportService.topRevenue()
  }

  @Get('out-of-stock')
  outOfStock(): Promise<ProductSalesRow[]> {
    return this.reportService.outOfStock()
  }
}
