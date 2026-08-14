import { DomainException } from './domain.exception'

export class InvalidTransitionException extends DomainException {
  constructor(from: string, to: string) {
    super(`Transición inválida de "${from}" a "${to}"`)
    this.name = 'InvalidTransitionException'
  }
}
