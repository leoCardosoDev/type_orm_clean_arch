import { RequiredFieldError } from '../errors'

export class RequiredStringValidation {
  constructor(
    private readonly _value: string,
    private readonly _fieldName: string
  ) {}
  validate(): Error | undefined {
    return new RequiredFieldError('any_field')
  }
}
