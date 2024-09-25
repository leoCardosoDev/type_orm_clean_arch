import { RequiredFieldError } from '@/application/errors'

export class RequiredStringValidation {
  constructor(
    private readonly _value: string,
    private readonly _fieldName: string
  ) {}

  validate(): Error | undefined {
    if (this._value === '' || this._value === null || this._value === undefined) {
      return new RequiredFieldError(this._fieldName)
    }
  }
}
