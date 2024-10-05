import { PgUserAccountRepository } from '@/infra/repository/postgres'
import { AppDataSource } from '@/main/config/postgres/data-source'

export const makePgUserAccountRepository = (): PgUserAccountRepository => {
  return new PgUserAccountRepository(AppDataSource)
}
