import { DataType, IMemoryDb, newDb } from 'pg-mem'
import { DataSource } from 'typeorm'

export const makeFakeDb = async (): Promise<IMemoryDb> => {
  const db = newDb()
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
  return db
}

export const makeFakeConnection = async (db: IMemoryDb, entities?: any[]): Promise<DataSource> => {
  const connection = await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: entities ?? ['src/infra/repository/postgres/entities/index.ts']
  })
  await connection.initialize()
  await connection.synchronize()
  return connection
}
