import { ValidationComposite, Validator } from '@/application/validation'
import { mock } from 'jest-mock-extended'

describe('ValidateComposite', () => {
  it('should return undefined if all Validatiors return undefined', () => {
    const validator1 = mock<Validator>()
    validator1.validate.mockReturnValue(undefined)
    const validator2 = mock<Validator>()
    validator2.validate.mockReturnValue(undefined)
    const validators = [validator1, validator2]
    const sut = new ValidationComposite(validators)
    const error = sut.validate()
    expect(error).toBeUndefined()
  })
})
