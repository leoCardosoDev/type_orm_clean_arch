import { FacebookAuthenticationService } from '@/domain/services'
import { makeFacebookApi } from '@/main/factories/apis'
import { makePgUserAccountRepository } from '@/main/factories/repository'
import { makeJwtTokenHandler } from '@/main/factories/crypto'

export const makeFacebookAuthenticationService = (): FacebookAuthenticationService => {
  return new FacebookAuthenticationService(makeFacebookApi(), makePgUserAccountRepository(), makeJwtTokenHandler())
}
