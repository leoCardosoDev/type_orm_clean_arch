import { FacebookAuthenticationUsecase } from '@/domain/use-cases'
import { makeFacebookApi } from '@/main/factories/apis'
import { makePgUserAccountRepository } from '@/main/factories/repository'
import { makeJwtTokenHandler } from '@/main/factories/crypto'

export const makeFacebookAuthentication = (): FacebookAuthenticationUsecase => {
  return new FacebookAuthenticationUsecase(makeFacebookApi(), makePgUserAccountRepository(), makeJwtTokenHandler())
}
