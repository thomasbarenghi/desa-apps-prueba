import { DomainException } from './domain.exception'

export class ForbiddenException extends DomainException {
  constructor(message = 'No tiene permisos para esta operación') {
    super(message)
    this.name = 'ForbiddenException'
  }
}
