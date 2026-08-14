export class CreateProductDto {
  categoryId: number
  name: string
  description: string
  price: number
  image: string | null
  available: boolean
}

export class UpdateProductDto {
  categoryId?: number
  name?: string
  description?: string
  price?: number
  image?: string | null
  available?: boolean
}
