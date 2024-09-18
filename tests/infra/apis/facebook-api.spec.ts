import { FacebookApi } from '@/infra/apis'
import { HttpGetClient } from '@/infra/gateways'
import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookApi', () => {
  let httpClient: MockProxy<HttpGetClient>
  const clientId = 'any_client_id'
  const clientSecret = 'any_client_secret'
  it('should get app token', async () => {
    httpClient = mock()
    const sut = new FacebookApi(httpClient, clientId, clientSecret)
    await sut.loadUser({ token: 'any_client_token' })
    expect(httpClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/oauth/access_token',
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials'
      }
    })
  })
})
