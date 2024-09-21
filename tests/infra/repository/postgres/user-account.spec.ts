import { PgUserAccountRepository } from '@/infra/repository/postgres'
import { PgUser } from '@/infra/repository/postgres/entities'
import { DataType, IBackup, IMemoryDb, newDb } from 'pg-mem'
import { DataSource, Repository } from 'typeorm'

describe('PgUserAccountRepository', () => {
  describe('load', () => {
    let sut: PgUserAccountRepository
    let pgUserRepository: Repository<PgUser>
    let connection: DataSource
    let db: IMemoryDb
    let backup: IBackup

    beforeAll(async () => {
      db = newDb()
      db.public.registerFunction({
        name: 'current_database',
        returns: db.public.getType(DataType.text),
        implementation: () => 'pg_mem_test_db'
      })
      db.public.registerFunction({
        name: 'version',
        returns: db.public.getType(DataType.text),
        implementation: () => 'PostgreSQL 13.3'
      })
      db.public.registerFunction({
        name: 'obj_description',
        args: [DataType.regclass, DataType.text],
        returns: db.public.getType(DataType.text),
        implementation: () => null
      })
      connection = await db.adapters.createTypeormDataSource({
        type: 'postgres',
        entities: [PgUser]
      })
      await connection.initialize()
      await connection.synchronize()
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
