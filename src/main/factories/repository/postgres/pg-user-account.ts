import { PgUserAccountRepository } from '@/infra/repository/postgres'

export const makePgUserAccountRepository = (): PgUserAccountRepository => {
  return new PgUserAccountRepository()
}
