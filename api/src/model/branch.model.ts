export interface Branch {
  id: number
  name: string
  addressText: string
  latitude: number
  longitude: number
  phone: string
  active: boolean
}

export interface BranchHour {
  id: number
  branchId: number
  dayOfWeek: number
  openingTime: string
  closingTime: string
}
