import { Validator } from '@/application/validation'

export class ValidationComposite {
  constructor(private readonly _validators: Validator[]) {}

  validate(): undefined {
    return undefined
  }
}
