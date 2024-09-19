import { HttpGetClient } from '@/infra/gateways'
import { LoadFacebookUserApi, LoadFacebookUserApiParams, LoadFacebookUserApiResult } from '@/application/contracts/apis'

export class FacebookApi implements LoadFacebookUserApi {
  private readonly baseUrl = 'https://graph.facebook.com'

  constructor(
    private readonly _httpClient: HttpGetClient,
    private readonly _clientId: string,
    private readonly _clientSecret: string
  ) {}

  async loadUser(params: LoadFacebookUserApiParams): Promise<LoadFacebookUserApiResult> {
    const appToken = await this._httpClient.get({
      url: `${this.baseUrl}/oauth/access_token`,
      params: {
        client_id: this._clientId,
        client_secret: this._clientSecret,
        grant_type: 'client_credentials'
      }
    })
    const debugToken = await this._httpClient.get({
      url: `${this.baseUrl}/debug_token`,
      params: {
        access_token: appToken.access_token,
        input_token: params.token
      }
    })
    const userInfo = await this._httpClient.get({
      url: `${this.baseUrl}/${debugToken.data.user_id}`,
      params: {
        fields: ['id', 'name', 'email'].join(','),
        access_token: params.token
      }
    })
    return {
      facebookId: userInfo.id,
      name: userInfo.name,
      email: userInfo.email
    }
  }
}
