import { PgUserAccountRepository } from '@/infra/repository/postgres'
import { PgUser } from '@/infra/repository/postgres/entities'
import { DataType, newDb } from 'pg-mem'

describe('PgUserAccountRepository', () => {
  describe('load', () => {
    it('should return an account if email exists', async () => {
      const db = newDb()
      db.public.registerFunction({
        name: 'current_database',
        returns: db.public.getType(DataType.text),
        implementation: () => 'pg_mem_test_db' // Retorna um nome fictício de banco de dados
      })
      db.public.registerFunction({
        name: 'version',
        returns: db.public.getType(DataType.text), // Retorna o tipo text
        implementation: () => 'PostgreSQL 13.3' // Retorna uma string fictícia com a versão
      })
      db.public.registerFunction({
        name: 'obj_description',
        args: [DataType.regclass, DataType.text], // Tipos esperados para os argumentos
        returns: db.public.getType(DataType.text),
        implementation: () => null // Retorna null ou uma string fictícia
      })
      const connection = await db.adapters.createTypeormDataSource({
        type: 'postgres',
        entities: [PgUser]
      })
      await connection.initialize()
      await connection.synchronize()
      const pgUserRepository = connection.getRepository(PgUser)
      await pgUserRepository.save({ email: 'existing_email' })
      const sut = new PgUserAccountRepository(connection)
      const account = await sut.load({ email: 'existing_email' })
      expect(account).toEqual({ id: '1' })
    })
  })
})
