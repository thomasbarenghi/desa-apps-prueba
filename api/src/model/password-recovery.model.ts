export interface PasswordRecovery {
  id: number
  userId: number
  token: string
  expiresAt: Date
  used: boolean
}
