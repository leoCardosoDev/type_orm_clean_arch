import { AuthenticationError } from '@/domain/errors'
import { LoadFacebookUserApi, LoadFacebookUserApiParams, LoadFacebookUserApiResult } from '@/application/contracts/apis'
import { FacebookAuthenticationService } from '@/application/services'

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  result: undefined
  callsCount = 0
  async loadUser (params: LoadFacebookUserApiParams ): Promise<LoadFacebookUserApiResult> {
    this.token = params.token
    this.callsCount++
    return this.result
  }
}

describe('Facebook Authentication Service', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)
    await sut.perform({ token: 'any_token' })
    expect(loadFacebookUserApi.token).toBe('any_token')
    expect(loadFacebookUserApi.callsCount).toBe(1)
  })

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    loadFacebookUserApi.result = undefined
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)
    const authResult = await sut.perform({ token: 'any_token' })
    expect(authResult).toEqual(new AuthenticationError())
  })
})
