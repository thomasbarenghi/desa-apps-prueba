export class CreateSystemParameterDto {
  parameterKey: string
  parameterValue: string
  description: string
}

export class UpdateSystemParameterDto {
  parameterValue?: string
  description?: string
}
