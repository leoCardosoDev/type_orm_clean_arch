import {
  LoadUserAccountRepository,
  LoadUserAccountRepositoryParams,
  LoadUserAccountRepositoryResult,
  SaveFacebookAccountRepository,
  SaveFacebookAccountRepositoryParams,
  SaveFacebookAccountRepositoryResult
} from '@/domain/contracts/repositories'
import { DataSource } from 'typeorm'
import { PgUser } from '@/infra/repository/postgres/entities'

type LoadParams = LoadUserAccountRepositoryParams
type LoadResult = LoadUserAccountRepositoryResult
type SaveParams = SaveFacebookAccountRepositoryParams
type SaveResult = SaveFacebookAccountRepositoryResult

export class PgUserAccountRepository implements LoadUserAccountRepository, SaveFacebookAccountRepository {
  private dataSource!: DataSource

  setDataSource(dataSource: DataSource): void {
    this.dataSource = dataSource
  }

  async load({ email }: LoadParams): Promise<LoadResult> {
    const pgUserRepository = this.dataSource.getRepository(PgUser)
    const pgUser = await pgUserRepository.findOne({ where: { email } })
    if (!pgUser) return undefined
    return { id: pgUser!.id.toString(), name: pgUser?.name ?? undefined }
  }

  async saveWithFacebook({ id, name, email, facebookId }: SaveParams): Promise<SaveResult> {
    let resultId: string
    const pgUserRepository = this.dataSource.getRepository(PgUser)
    if (id === undefined) {
      const pgUser = await pgUserRepository.save({ email, name, facebookId })
      resultId = pgUser.id.toString()
    } else {
      resultId = id
      await pgUserRepository.update({ id: parseInt(id) }, { name, facebookId })
    }
    return { id: resultId }
  }
}
