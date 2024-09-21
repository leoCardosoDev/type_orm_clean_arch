import { PgUserAccountRepository } from '@/infra/repository/postgres'
import { PgUser } from '@/infra/repository/postgres/entities'
import { IBackup } from 'pg-mem'
import { DataSource, Repository } from 'typeorm'
import { makeFakeConnection, makeFakeDb } from '@/tests/infra/repository/postgres/mocks'

describe('PgUserAccountRepository', () => {
  describe('load', () => {
    let sut: PgUserAccountRepository
    let pgUserRepository: Repository<PgUser>
    let connection: DataSource
    let backup: IBackup

    beforeAll(async () => {
      const db = await makeFakeDb()
      connection = await makeFakeConnection(db, [PgUser])
      backup = db.backup()
      pgUserRepository = connection.getRepository(PgUser)
    })

    afterAll(async () => {
      if (connection.isInitialized) {
        await connection.close()
      }
    })

    beforeEach(() => {
      backup.restore()
      sut = new PgUserAccountRepository(connection)
    })

    it('should return an account if email exists', async () => {
      await pgUserRepository.save({ email: 'existing_email' })
      const account = await sut.load({ email: 'existing_email' })
      expect(account).toEqual({ id: '1' })
    })

    it('should return undefined if email does not exist', async () => {
      const account = await sut.load({ email: 'any_email' })
      expect(account).toBeUndefined()
    })
  })
})
