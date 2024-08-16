import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationParams } from '@/domain/features'
import { LoadFacebookUserApi } from '@/application/contracts/apis'
import { CreateFacebookAccountRepository, LoadUserAccountRepository } from '@/application/contracts/repositories'

export class FacebookAuthenticationService {
  constructor(
    private readonly _loadFacebookUserApi: LoadFacebookUserApi,
    private readonly _loadUserAccountRepository: LoadUserAccountRepository,
    private readonly _createFacebookAccountRepository: CreateFacebookAccountRepository
  ) {}
  async perform(_params: FacebookAuthenticationParams): Promise<AuthenticationError> {
    const fbData = await this._loadFacebookUserApi.loadUser(_params)
    if (fbData !== undefined) {
      await this._loadUserAccountRepository.load({ email: fbData.email })
      await this._createFacebookAccountRepository.createFromFacebook(fbData)
    }
    return new AuthenticationError()
  }
}
