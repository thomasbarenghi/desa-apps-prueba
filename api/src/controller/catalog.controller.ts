import { Controller, Get } from '@nestjs/common'
import { CatalogQueryOrchestrator, CatalogView } from '../service/catalog-query.orchestrator'

@Controller('catalog')
export class CatalogController {
  constructor(private readonly orchestrator: CatalogQueryOrchestrator) {}

  @Get()
  view(): Promise<CatalogView> {
    return this.orchestrator.view()
  }
}
