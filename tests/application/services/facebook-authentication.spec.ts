import { AuthenticationError } from '@/domain/errors'
import { FacebookAccount } from '@/domain/models'
import { LoadFacebookUserApi } from '@/application/contracts/apis'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/application/contracts/repositories'
import { FacebookAuthenticationService } from '@/application/services'

import { mocked } from "jest-mock"
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/domain/models/facebook-account')

describe('Facebook Authentication Service', () => {
  let facebookApi: MockProxy<LoadFacebookUserApi>
  let userAccountRepository: MockProxy<LoadUserAccountRepository & SaveFacebookAccountRepository >
  let sut: FacebookAuthenticationService
  const token = 'any_token'

  beforeEach(() => {
    facebookApi = mock()
    userAccountRepository = mock()
    facebookApi.loadUser.mockResolvedValue({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_facebook_id'
    })
    userAccountRepository.load.mockResolvedValue(undefined)
    sut = new FacebookAuthenticationService(
      facebookApi,
      userAccountRepository,
    )
  })

  it('should call LoadFacebookUserApi with correct params', async () => {
    await sut.perform({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    facebookApi.loadUser.mockResolvedValueOnce(undefined)
    const authResult = await sut.perform({ token })
    expect(authResult).toEqual(new AuthenticationError())
  })

  it('should return LoadUserAccountRepository when LoadFacebookUserApi returns data', async () => {
    await sut.perform({ token })
    expect(userAccountRepository.load).toHaveBeenCalledWith({ email: 'any_fb_email' })
    expect(userAccountRepository.load).toHaveBeenCalledTimes(1)
  })

  it('should call SaveFacebookRepository with FacebookAccount', async () => {
    const facebookAccountStub = jest.fn().mockImplementation(() => ({ any: 'any'}))
    mocked(FacebookAccount).mockImplementation(facebookAccountStub)
    await sut.perform({ token })
    expect(userAccountRepository.saveWithFacebook).toHaveBeenCalledWith({ any: 'any'})
    expect(userAccountRepository.saveWithFacebook).toHaveBeenCalledTimes(1)
  })
})
