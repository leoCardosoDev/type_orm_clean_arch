import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationParams } from '@/domain/features'
import { LoadFacebookUserApi } from '@/application/contracts/apis'
import { CreateFacebookAccountRepository, LoadUserAccountRepository } from '@/application/contracts/repositories'

export class FacebookAuthenticationService {
  constructor(
    private readonly _facebookApi: LoadFacebookUserApi,
    private readonly _userAccountRepository: LoadUserAccountRepository & CreateFacebookAccountRepository
  ) {}
  async perform(_params: FacebookAuthenticationParams): Promise<AuthenticationError> {
    const fbData = await this._facebookApi.loadUser(_params)
    if (fbData !== undefined) {
      await this._userAccountRepository.load({ email: fbData.email })
      await this._userAccountRepository.createFromFacebook(fbData)
    }
    return new AuthenticationError()
  }
}
