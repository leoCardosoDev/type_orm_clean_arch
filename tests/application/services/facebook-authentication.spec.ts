import { LoadFacebookUserApi, LoadFacebookUserApiParams, LoadFacebookUserApiResult } from '@/application/contracts/api'
import { FacebookAuthenticationService } from '@/application/services'

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  async loadUser (params: LoadFacebookUserApiParams ): Promise<LoadFacebookUserApiResult> {
    this.token = params.token
  }
}

describe('Facebook Authentication Service', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)
    await sut.perform({ token: 'any_token' })
    expect(loadFacebookUserApi.token).toBe('any_token')
  })
})

