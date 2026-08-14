import { DomainException } from './domain.exception'

export class NoBranchAvailableException extends DomainException {
  constructor() {
    super('No hay una sucursal disponible para esta dirección')
    this.name = 'NoBranchAvailableException'
  }
}
