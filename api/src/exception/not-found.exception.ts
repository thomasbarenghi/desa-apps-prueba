import { DomainException } from './domain.exception'

export class NotFoundException extends DomainException {
  constructor(resource: string) {
    super(`${resource} no encontrado`)
    this.name = 'NotFoundException'
  }
}
