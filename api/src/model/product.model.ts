export interface Product {
  id: number
  categoryId: number
  name: string
  description: string
  price: number
  image: string | null
  available: boolean
}
