export class CreateBranchDto {
  name: string
  addressText: string
  latitude: number
  longitude: number
  phone: string
  active: boolean
}

export class UpdateBranchDto {
  name?: string
  addressText?: string
  latitude?: number
  longitude?: number
  phone?: string
  active?: boolean
}

export class CreateBranchHourDto {
  dayOfWeek: number
  openingTime: string
  closingTime: string
}
