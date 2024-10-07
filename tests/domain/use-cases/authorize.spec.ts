import { mock, MockProxy } from 'jest-mock-extended'
import { TokenValidator } from '@/domain/contracts/cryptography'
import { Authorize, setUpAuthorize } from '@/domain/use-cases'

jest.mock('@/domain/entities/facebook-account')

describe('Authorize Usecase', () => {
  let crypto: MockProxy<TokenValidator>
  let sut: Authorize
  let token: string

  beforeAll(() => {
    token = 'any_token'
    crypto = mock()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    sut = setUpAuthorize(crypto)
  })

  it('should call TokenValidator with correct params', async () => {
    await sut({ token })
    expect(crypto.validateToken).toHaveBeenCalledWith({ token })
    expect(crypto.validateToken).toHaveBeenCalledTimes(1)
  })
})
