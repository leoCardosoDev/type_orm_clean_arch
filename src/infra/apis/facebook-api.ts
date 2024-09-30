import { HttpGetClient } from '@/infra/gateways'
import { LoadFacebookUserApi, LoadFacebookUserApiParams, LoadFacebookUserApiResult } from '@/domain/contracts/apis'

type AppToken = {
  access_token: string
}

type DebugToken = {
  data: {
    user_id: string
  }
}

type UserInfo = {
  id: string
  name: string
  email: string
}

export class FacebookApi implements LoadFacebookUserApi {
  private readonly baseUrl = 'https://graph.facebook.com'

  constructor(
    private readonly _httpClient: HttpGetClient,
    private readonly _clientId: string,
    private readonly _clientSecret: string
  ) {}

  async loadUser(params: LoadFacebookUserApiParams): Promise<LoadFacebookUserApiResult> {
    return this.getUserInfo(params.token)
      .then(({ id, name, email }) => ({ facebookId: id, name: name, email: email }))
      .catch(() => undefined)
  }

  private async getAppToken(): Promise<AppToken> {
    return this._httpClient.get({
      url: `${this.baseUrl}/oauth/access_token`,
      params: {
        client_id: this._clientId,
        client_secret: this._clientSecret,
        grant_type: 'client_credentials'
      }
    })
  }

  private async getDebugToken(clientToken: string): Promise<DebugToken> {
    const appToken = await this.getAppToken()
    return this._httpClient.get({
      url: `${this.baseUrl}/debug_token`,
      params: {
        access_token: appToken.access_token,
        input_token: clientToken
      }
    })
  }

  private async getUserInfo(clientToken: string): Promise<UserInfo> {
    const debugToken = await this.getDebugToken(clientToken)
    return this._httpClient.get({
      url: `${this.baseUrl}/${debugToken.data.user_id}`,
      params: {
        fields: ['id', 'name', 'email'].join(','),
        access_token: clientToken
      }
    })
  }
}
