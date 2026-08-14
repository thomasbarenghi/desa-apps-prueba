import { Module } from '@nestjs/common'
import { CustomerOrderController } from '../controller/customer-order.controller'
import { AdminOrderController } from '../controller/admin-order.controller'
import { OrderService } from '../service/order.service'
import { OrderQueryOrchestrator } from '../service/order-query.orchestrator'
import { RepeatOrderOrchestrator } from '../service/repeat-order.orchestrator'
import { OrderStatusOrchestrator } from '../service/order-status.orchestrator'
import {
  OrderRepository,
  OrderItemRepository,
  OrderItemOptionRepository,
  OrderStatusHistoryRepository,
} from '../repository/order.repository'
import { BranchModule } from './branch.module'
import { GeneralStateModule } from './general-state.module'
import { ProductModule } from './product.module'
import { CartModule } from './cart.module'

@Module({
  imports: [BranchModule, GeneralStateModule, ProductModule, CartModule],
  controllers: [CustomerOrderController, AdminOrderController],
  providers: [
    OrderService,
    OrderQueryOrchestrator,
    RepeatOrderOrchestrator,
    OrderStatusOrchestrator,
    OrderRepository,
    OrderItemRepository,
    OrderItemOptionRepository,
    OrderStatusHistoryRepository,
  ],
  exports: [OrderService, OrderRepository, OrderItemRepository],
})
export class OrderModule {}
