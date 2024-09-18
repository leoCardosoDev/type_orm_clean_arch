import { FacebookApi } from '@/infra/apis'
import { HttpGetClient } from '@/infra/gateways'
import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookApi', () => {
  let httpClient: MockProxy<HttpGetClient>
  it('should get app token', async () => {
    httpClient = mock()
    const sut = new FacebookApi(httpClient)
    await sut.loadUser({ token: 'any_client_token' })
    expect(httpClient.get).toHaveBeenCalledWith({ url: 'https://graph.facebook.com/oauth/access_token' })
  })
})
