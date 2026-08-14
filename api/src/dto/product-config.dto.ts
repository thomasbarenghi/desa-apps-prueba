import { ConfigGroupType } from '../model/product-config.model'

export class CreateConfigGroupDto {
  productId: number
  name: string
  type: ConfigGroupType
  required: boolean
}

export class CreateConfigOptionDto {
  groupId: number
  name: string
  extraPrice: number
  available: boolean
}
