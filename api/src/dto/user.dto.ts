export class UpdateProfileDto {
  firstName?: string
  lastName?: string
  phone?: string
}

export class CreateAdminDto {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
}
