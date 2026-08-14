export class CreatePromotionDto {
  name: string
  description: string
  startDate: string
  endDate: string
  active: boolean
}

export class UpdatePromotionDto {
  name?: string
  description?: string
  startDate?: string
  endDate?: string
  active?: boolean
}
