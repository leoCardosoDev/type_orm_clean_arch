import { FacebookAuthenticationParams } from '@/domain/features'
import { LoadFacebookUserApi } from '@/application/contracts/apis'
import { AuthenticationError } from '@/domain/errors'

export class FacebookAuthenticationService {
  constructor(private readonly _loadFacebookUserApi: LoadFacebookUserApi) {}
  async perform(_params: FacebookAuthenticationParams): Promise<AuthenticationError> {
    await this._loadFacebookUserApi.loadUser(_params)
    return new AuthenticationError()
  }
}
