import { HttpGetClient } from '@/infra/gateways'
import { LoadFacebookUserApiParams } from '@/application/contracts/apis'

export class FacebookApi {
  private readonly baseUrl = 'https://graph.facebook.com'

  constructor(
    private readonly _httpClient: HttpGetClient,
    private readonly _clientId: string,
    private readonly _clientSecret: string
  ) {}

  async loadUser(_params: LoadFacebookUserApiParams): Promise<void> {
    await this._httpClient.get({
      url: `${this.baseUrl}/oauth/access_token`,
      params: {
        client_id: this._clientId,
        client_secret: this._clientSecret,
        grant_type: 'client_credentials'
      }
    })
  }
}
