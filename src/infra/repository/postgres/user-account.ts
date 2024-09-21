import { LoadUserAccountRepository, LoadUserAccountRepositoryParams, LoadUserAccountRepositoryResult } from '@/application/contracts/repositories'
import { DataSource } from 'typeorm'
import { PgUser } from '@/infra/repository/postgres/entities'

export class PgUserAccountRepository implements LoadUserAccountRepository {
  constructor(private readonly _dataSource: DataSource) {}
  async load(param: LoadUserAccountRepositoryParams): Promise<LoadUserAccountRepositoryResult> {
    const pgUserRepository = this._dataSource.getRepository(PgUser)
    const pgUser = await pgUserRepository.findOne({ where: { email: param.email } })
    if (!pgUser) return undefined
    return {
      id: pgUser!.id.toString(),
      name: pgUser?.name ?? undefined
    }
  }
}
