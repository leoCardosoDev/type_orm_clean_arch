import { ValidationComposite, Validator } from '@/application/validation'
import { mock, MockProxy } from 'jest-mock-extended'

describe('ValidateComposite', () => {
  let sut: ValidationComposite
  let validator1: MockProxy<Validator>
  let validator2: MockProxy<Validator>
  let validators: Validator[]

  beforeAll(() => {
    validator1 = mock()
    validator2 = mock()
    validator1.validate.mockReturnValue(undefined)
    validator2.validate.mockReturnValue(undefined)
    validators = [validator1, validator2]
  })

  beforeEach(() => {
    sut = new ValidationComposite(validators)
  })

  it('should return undefined if all Validatiors return undefined', () => {
    const error = sut.validate()
    expect(error).toBeUndefined()
  })
})
