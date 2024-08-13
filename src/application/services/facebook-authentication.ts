import { FacebookAuthenticationParams } from '@/domain/features'
import { LoadFacebookUserApi, LoadFacebookUserApiResult } from '@/application/contracts/api'

export class FacebookAuthenticationService {
  constructor(private readonly _loadFacebookUserApi: LoadFacebookUserApi) {}
  async perform(_params: FacebookAuthenticationParams): Promise<LoadFacebookUserApiResult> {
    await this._loadFacebookUserApi.loadUser(_params)
  }
}
