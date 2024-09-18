import { LoadFacebookUserApiParams } from '@/application/contracts/apis'
import { HttpGetClient } from '@/infra/gateways'

export class FacebookApi {
  private readonly baseUrl = 'https://graph.facebook.com'
  constructor(private readonly _httpClient: HttpGetClient) {}

  async loadUser(_params: LoadFacebookUserApiParams): Promise<void> {
    await this._httpClient.get({ url: `${this.baseUrl}/oauth/access_token` })
  }
}
