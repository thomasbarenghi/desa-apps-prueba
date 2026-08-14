import { Module } from '@nestjs/common'
import { CatalogController } from '../controller/catalog.controller'
import { CatalogQueryOrchestrator } from '../service/catalog-query.orchestrator'
import { CategoryModule } from './category.module'
import { ProductModule } from './product.module'
import { ProductConfigModule } from './product-config.module'

@Module({
  imports: [CategoryModule, ProductModule, ProductConfigModule],
  controllers: [CatalogController],
  providers: [CatalogQueryOrchestrator],
})
export class CatalogModule {}
