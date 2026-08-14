export class CreateGeneralStateDto {
  entityType: string
  code: string
  name: string
  active: boolean
}

export class UpdateGeneralStateDto {
  entityType?: string
  code?: string
  name?: string
  active?: boolean
}
