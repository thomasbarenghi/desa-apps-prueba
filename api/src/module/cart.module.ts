import { Module } from '@nestjs/common'
import { CartController } from '../controller/cart.controller'
import { CartOrchestrator } from '../service/cart.orchestrator'
import { CartService } from '../service/cart.service'
import {
  CartRepository,
  CartItemRepository,
  CartItemOptionRepository,
} from '../repository/cart.repository'
import { ProductModule } from './product.module'
import { ProductConfigModule } from './product-config.module'

@Module({
  imports: [ProductModule, ProductConfigModule],
  controllers: [CartController],
  providers: [
    CartOrchestrator,
    CartService,
    CartRepository,
    CartItemRepository,
    CartItemOptionRepository,
  ],
  exports: [CartService],
})
export class CartModule {}
