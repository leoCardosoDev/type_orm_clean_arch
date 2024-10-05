import { AuthenticationError } from '@/domain/entities/errors'
import { AccessToken, FacebookAccount } from '@/domain/entities'
import { LoadFacebookUserApi } from '@/domain/contracts/apis'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/domain/contracts/repositories'
import { TokenGenerator } from '@/domain/contracts/cryptography'

type Setup = (_facebookApi: LoadFacebookUserApi, _userAccountRepository: LoadUserAccountRepository & SaveFacebookAccountRepository, _crypto: TokenGenerator) => FacebookAuthentication
export type FacebookAuthentication = (_params: { token: string }) => Promise<{ accessToken: string }>

export const setUpFacebookAuthentication: Setup =
  (_facebookApi, _userAccountRepository, _crypto): FacebookAuthentication =>
  async _params => {
    const fbData = await _facebookApi.loadUser(_params)
    if (fbData !== undefined) {
      const accountData = await _userAccountRepository.load({ email: fbData.email })
      const fbAccount = new FacebookAccount(fbData, accountData)
      const { id } = await _userAccountRepository.saveWithFacebook(fbAccount)
      const accessToken = await _crypto.generateToken({ key: id, expirationInMs: AccessToken.expirationInMs })
      return { accessToken }
    }
    throw new AuthenticationError()
  }
