import { DomainException } from './domain.exception'

export class UnauthorizedException extends DomainException {
  constructor(message = 'Credenciales inválidas') {
    super(message)
    this.name = 'UnauthorizedException'
  }
}
