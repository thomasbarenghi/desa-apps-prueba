import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './module/auth.module'
import { UserModule } from './module/user.module'
import { AddressModule } from './module/address.module'
import { BranchModule } from './module/branch.module'
import { BranchAvailabilityModule } from './module/branch-availability.module'
import { CategoryModule } from './module/category.module'
import { ProductModule } from './module/product.module'
import { ProductConfigModule } from './module/product-config.module'
import { CatalogModule } from './module/catalog.module'
import { CartModule } from './module/cart.module'
import { OrderModule } from './module/order.module'
import { CheckoutModule } from './module/checkout.module'
import { StockModule } from './module/stock.module'
import { PromotionModule } from './module/promotion.module'
import { GeneralStateModule } from './module/general-state.module'
import { SystemParameterModule } from './module/system-parameter.module'
import { ReportModule } from './module/report.module'

@Module({
  imports: [
    AuthModule,
    UserModule,
    AddressModule,
    BranchModule,
    BranchAvailabilityModule,
    CategoryModule,
    ProductModule,
    ProductConfigModule,
    CatalogModule,
    CartModule,
    OrderModule,
    CheckoutModule,
    StockModule,
    PromotionModule,
    GeneralStateModule,
    SystemParameterModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
