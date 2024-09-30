import { FacebookApi } from '@/infra/apis'
import { AxiosHttpCLient } from '@/infra/gateways'
import { env } from '@/main/config/env'

describe('Facebook Api integration Tests', () => {
  let axiosClient: AxiosHttpCLient
  let sut: FacebookApi

  beforeEach(() => {
    axiosClient = new AxiosHttpCLient()
    sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)
  })

  it('should return a Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: env.facebookApi.accessToken })
    expect(fbUser).toEqual({
      facebookId: '8544711292255677',
      name: 'Leonardo De Oliveira Silva',
      email: 'leowkfmc@hotmail.com'
    })
  })

  it('should return a undefined if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid' })
    expect(fbUser).toBeUndefined()
  })
})
