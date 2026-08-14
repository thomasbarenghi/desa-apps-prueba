import { Module } from '@nestjs/common'
import { CheckoutController } from '../controller/checkout.controller'
import { CheckoutOrchestrator } from '../service/checkout.orchestrator'
import { UserModule } from './user.module'
import { AddressModule } from './address.module'
import { CartModule } from './cart.module'
import { ProductModule } from './product.module'
import { ProductConfigModule } from './product-config.module'
import { BranchModule } from './branch.module'
import { GeneralStateModule } from './general-state.module'
import { SystemParameterModule } from './system-parameter.module'
import { OrderModule } from './order.module'

@Module({
  imports: [
    UserModule,
    AddressModule,
    CartModule,
    ProductModule,
    ProductConfigModule,
    BranchModule,
    GeneralStateModule,
    SystemParameterModule,
    OrderModule,
  ],
  controllers: [CheckoutController],
  providers: [CheckoutOrchestrator],
})
export class CheckoutModule {}
