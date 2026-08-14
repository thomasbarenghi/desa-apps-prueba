import { Module } from '@nestjs/common'
import { PromotionController } from '../controller/promotion.controller'
import { PromotionService } from '../service/promotion.service'
import { PromotionRepository } from '../repository/promotion.repository'

@Module({
  controllers: [PromotionController],
  providers: [PromotionService, PromotionRepository],
})
export class PromotionModule {}
