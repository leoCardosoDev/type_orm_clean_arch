import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationParams } from '@/domain/features'
import { LoadFacebookUserApi } from '@/application/contracts/apis'
import { CreateFacebookAccountRepository, LoadUserAccountRepository, UpdateFacebookAccountRepository } from '@/application/contracts/repositories'

export class FacebookAuthenticationService {
  constructor(
    private readonly _facebookApi: LoadFacebookUserApi,
    private readonly _userAccountRepository: LoadUserAccountRepository & CreateFacebookAccountRepository & UpdateFacebookAccountRepository
  ) {}
  async perform(_params: FacebookAuthenticationParams): Promise<AuthenticationError> {
    const fbData = await this._facebookApi.loadUser(_params)
    if (fbData !== undefined) {
      const accountData = await this._userAccountRepository.load({ email: fbData.email })
      if (accountData !== undefined) {
        await this._userAccountRepository.updateWithFacebook({
          id: accountData.id,
          name: accountData.name ?? fbData.name,
          facebookId: fbData.facebookId
        })
      } else {
        await this._userAccountRepository.createFromFacebook(fbData)
      }
    }
    return new AuthenticationError()
  }
}
