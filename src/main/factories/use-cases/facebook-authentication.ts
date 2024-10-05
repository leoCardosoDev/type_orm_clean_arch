import { FacebookAuthentication, setUpFacebookAuthentication } from '@/domain/use-cases'
import { makeFacebookApi } from '@/main/factories/apis'
import { makePgUserAccountRepository } from '@/main/factories/repository'
import { makeJwtTokenHandler } from '@/main/factories/crypto'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return setUpFacebookAuthentication(makeFacebookApi(), makePgUserAccountRepository(), makeJwtTokenHandler())
}
