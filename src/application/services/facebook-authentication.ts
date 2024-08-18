import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationParams } from '@/domain/features'
import { FacebookAccount } from '@/domain/models'
import { LoadFacebookUserApi } from '@/application/contracts/apis'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/application/contracts/repositories'
import { TokenGenerator } from '../contracts/cryptography'

export class FacebookAuthenticationService {
  constructor(
    private readonly _facebookApi: LoadFacebookUserApi,
    private readonly _userAccountRepository: LoadUserAccountRepository & SaveFacebookAccountRepository,
    private readonly _crypto: TokenGenerator
  ) {}
  async perform(_params: FacebookAuthenticationParams): Promise<AuthenticationError> {
    const fbData = await this._facebookApi.loadUser(_params)
    if (fbData !== undefined) {
      const accountData = await this._userAccountRepository.load({ email: fbData.email })
      const fbAccount = new FacebookAccount(fbData, accountData)
      const { id } = await this._userAccountRepository.saveWithFacebook(fbAccount)
      await this._crypto.generateToken({ key: id })
    }
    return new AuthenticationError()
  }
}
