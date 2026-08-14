import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { CartOrchestrator } from '../service/cart.orchestrator'
import { CartService } from '../service/cart.service'
import { AddItemDto, UpdateItemDto } from '../dto/cart.dto'
import { Cart, CartItem } from '../model/cart.model'

@Controller('clients/:clientId/cart')
export class CartController {
  constructor(
    private readonly cartOrchestrator: CartOrchestrator,
    private readonly cartService: CartService,
  ) {}

  @Get()
  get(@Param('clientId') clientId: string): Promise<Cart | null> {
    return this.cartService.getOrCreateActive(Number(clientId))
  }

  @Post('items')
  addItem(@Param('clientId') clientId: string, @Body() dto: AddItemDto): Promise<Cart | null> {
    return this.cartOrchestrator.addItem({ clientId: Number(clientId), ...dto })
  }

  @Patch('items/:itemId')
  updateItem(
    @Param('clientId') clientId: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateItemDto,
  ): Promise<CartItem | null> {
    return this.cartService.updateItem(Number(clientId), Number(itemId), dto)
  }

  @Delete('items/:itemId')
  removeItem(@Param('clientId') clientId: string, @Param('itemId') itemId: string): Promise<void> {
    return this.cartService.removeItem(Number(clientId), Number(itemId))
  }
}
