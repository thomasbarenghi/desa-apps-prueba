import { Body, Controller, Param, Post } from '@nestjs/common'
import { CheckoutOrchestrator } from '../service/checkout.orchestrator'
import { ConfirmOrderDto } from '../dto/order.dto'
import { Order } from '../model/order.model'

@Controller('clients/:clientId/checkout')
export class CheckoutController {
  constructor(private readonly checkoutOrchestrator: CheckoutOrchestrator) {}

  @Post()
  confirm(
    @Param('clientId') clientId: string,
    @Body() dto: ConfirmOrderDto,
  ): Promise<Order | null> {
    return this.checkoutOrchestrator.confirm({
      clientId: Number(clientId),
      addressId: dto.addressId,
    })
  }
}
