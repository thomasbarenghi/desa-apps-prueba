export type ConfigGroupType = 'size' | 'flavor' | 'additional' | 'removal'

export interface ProductConfigGroup {
  id: number
  productId: number
  name: string
  type: ConfigGroupType
  required: boolean
}

export interface ProductConfigOption {
  id: number
  groupId: number
  name: string
  extraPrice: number
  available: boolean
}
