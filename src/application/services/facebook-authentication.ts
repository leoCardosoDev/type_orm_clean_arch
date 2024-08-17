import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationParams } from '@/domain/features'
import { LoadFacebookUserApi } from '@/application/contracts/apis'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/application/contracts/repositories'

export class FacebookAuthenticationService {
  constructor(
    private readonly _facebookApi: LoadFacebookUserApi,
    private readonly _userAccountRepository: LoadUserAccountRepository & SaveFacebookAccountRepository
  ) {}
  async perform(_params: FacebookAuthenticationParams): Promise<AuthenticationError> {
    const fbData = await this._facebookApi.loadUser(_params)
    if (fbData !== undefined) {
      const accountData = await this._userAccountRepository.load({ email: fbData.email })
      await this._userAccountRepository.saveWithFacebook({
        id: accountData?.id,
        name: accountData?.name ?? fbData.name,
        email: fbData.email,
        facebookId: fbData.facebookId
      })
    }
    return new AuthenticationError()
  }
}
