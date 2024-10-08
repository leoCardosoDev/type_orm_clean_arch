import { FacebookLoginController } from '@/application/controllers'
import { UnauthorizedError } from '@/application/errors'
import { RequiredStringValidation } from '@/application/validation'
import { AuthenticationError } from '@/domain/entities/errors'

describe('FacebookLoginController', () => {
  let sut: FacebookLoginController
  let facebookAuth: jest.Mock
  let token: string

  beforeAll(() => {
    token = 'any_token'
    facebookAuth = jest.fn()
    facebookAuth.mockResolvedValue({ accessToken: 'any_value' })
  })

  beforeEach(() => {
    sut = new FacebookLoginController(facebookAuth)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should build Validators correctly', () => {
    const validators = sut.buildValidators({ token })
    expect(validators).toEqual([new RequiredStringValidation('any_token', 'token')])
  })

  it('should call FacebookAuthentication with correct params', async () => {
    await sut.handle({ token })
    expect(facebookAuth).toHaveBeenCalledWith({ token })
    expect(facebookAuth).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if authentication fails', async () => {
    facebookAuth.mockRejectedValueOnce(new AuthenticationError())
    const httpResponse = await sut.handle({ token })
    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if authentication succeeds', async () => {
    const httpResponse = await sut.handle({ token })
    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { accessToken: 'any_value' }
    })
  })
})
