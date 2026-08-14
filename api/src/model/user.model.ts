export type UserRole = 'client' | 'admin'

export interface User {
  id: number
  email: string
  passwordHash: string
  role: UserRole
  firstName: string
  lastName: string
  phone: string
  active: boolean
  createdAt: Date
}
