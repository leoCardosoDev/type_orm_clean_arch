import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication, FacebookAuthenticationParams, FacebookAuthenticationResult } from '@/domain/features'
import { AccessToken, FacebookAccount } from '@/domain/models'
import { LoadFacebookUserApi } from '@/domain/contracts/apis'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/domain/contracts/repositories'
import { TokenGenerator } from '@/domain/contracts/cryptography'

export class FacebookAuthenticationService implements FacebookAuthentication {
  constructor(
    private readonly _facebookApi: LoadFacebookUserApi,
    private readonly _userAccountRepository: LoadUserAccountRepository & SaveFacebookAccountRepository,
    private readonly _crypto: TokenGenerator
  ) {}

  async perform(_params: FacebookAuthenticationParams): Promise<FacebookAuthenticationResult> {
    const fbData = await this._facebookApi.loadUser(_params)
    if (fbData !== undefined) {
      const accountData = await this._userAccountRepository.load({ email: fbData.email })
      const fbAccount = new FacebookAccount(fbData, accountData)
      const { id } = await this._userAccountRepository.saveWithFacebook(fbAccount)
      const token = await this._crypto.generateToken({ key: id, expirationInMs: AccessToken.expirationInMs })
      return new AccessToken(token)
    }
    return new AuthenticationError()
  }
}
