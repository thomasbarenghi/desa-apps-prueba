export class CreateAddressDto {
  label: string
  addressText: string
  city: string
  postalCode: string
  latitude: number
  longitude: number
}

export class UpdateAddressDto {
  label?: string
  addressText?: string
  city?: string
  postalCode?: string
  latitude?: number
  longitude?: number
}
