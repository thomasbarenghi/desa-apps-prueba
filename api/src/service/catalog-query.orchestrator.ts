import { Injectable } from '@nestjs/common'
import { CategoryService } from './category.service'
import { ProductService } from './product.service'
import { ProductConfigService } from './product-config.service'
import { Category } from '../model/category.model'
import { Product } from '../model/product.model'

export interface CatalogItem extends Product {
  configGroups: Awaited<ReturnType<ProductConfigService['listGroupsByProduct']>>
}

export interface CatalogView {
  categories: Category[]
  products: CatalogItem[]
}

@Injectable()
export class CatalogQueryOrchestrator {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private readonly productConfigService: ProductConfigService,
  ) {}

  async view(): Promise<CatalogView> {
    const categories = await this.categoryService.listActive()
    return { categories, products: [] }
  }
}
