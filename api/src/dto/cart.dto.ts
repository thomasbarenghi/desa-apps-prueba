export class AddItemDto {
  productId: number
  quantity: number
  observations?: string
  configOptionIds?: number[]
}

export class UpdateItemDto {
  quantity?: number
  observations?: string
}
