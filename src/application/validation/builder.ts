import { RequiredStringValidation, Validator } from '@/application/validation'

export class ValidationBuilder {
  private constructor(
    private readonly _value: string,
    private readonly _fieldName: string,
    private readonly _validators: Validator[] = []
  ) {}

  static of(params: { value: string; fieldName: string }): ValidationBuilder {
    return new ValidationBuilder(params.value, params.fieldName)
  }

  required(): ValidationBuilder {
    this._validators.push(new RequiredStringValidation(this._value, this._fieldName))
    return this
  }

  build(): Validator[] {
    return this._validators
  }
}
