import {
  LoadUserAccountRepository,
  LoadUserAccountRepositoryParams,
  LoadUserAccountRepositoryResult,
  SaveFacebookAccountRepositoryParams,
  SaveFacebookAccountRepositoryResult
} from '@/application/contracts/repositories'
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

  async saveWithFacebook(params: SaveFacebookAccountRepositoryParams): Promise<SaveFacebookAccountRepositoryResult> {
    let id: string
    const pgUserRepository = this._dataSource.getRepository(PgUser)
    if (params.id === undefined) {
      const pgUser = await pgUserRepository.save({
        email: params.email,
        name: params.name,
        facebookId: params.facebookId
      })
      id = pgUser.id.toString()
    } else {
      id = params.id
      await pgUserRepository.update(
        {
          id: parseInt(params.id)
        },
        {
          name: params.name,
          facebookId: params.facebookId
        }
      )
    }
    return { id }
  }
}
